"use strict";

import _ = require("lodash");
import {IApplication} from "./core/app";
import Fetcher from "./crawler/fetcher";
import Category from "./crawler/model/category";
import Product from "./crawler/model/product";
import {ICategory} from  "./model/category";
import {IProduct} from  "./model/product";

const SHOP_HOST = "https://murzik.in.ua";

type CategoryOrProduct = Category | Product;

export default (app: IApplication) => {

    const ProductModel = app.getContainer().get("@model/product");
    const CategoryModel = app.getContainer().get("@model/category");

    const fetcher = new Fetcher();

    function crawl(url: string): Promise<Category> {
        return fetcher
            .fetch(url)
            .then(($) => {
                const categoryTitle = $(".cnt > h1").html();
                const categoriesUrls = _.map<HTMLElement, string>($(".cat-lst .item > h2 > a").toArray(),
                    (node) => $(node).attr("href"));

                if (_.isEmpty(categoriesUrls)) {
                    const products = _.map($("div.prod-lst.prod-lst-full > .item").toArray(), (node) => {
                        const n = $(node);

                        const productUrl = n.find(".descr .ttl > a").attr("href");
                        const title = n.find(".descr .ttl > a").text();
                        const price = parseInt(n.find(".descr .price").text(), 10);
                        const description = n.find(".descr .short-txt").text();

                        return new Product(productUrl, title, price, description);
                    });
                    return new Category(url, categoryTitle, products);
                }

                return Promise.all(_.map(categoriesUrls, (u: string) => crawl(u)))
                    .then((children) =>
                        new Category(url, categoryTitle, children));
            });
    }

    function save(model: CategoryOrProduct, parent: ICategory | null): Promise<ICategory | IProduct> {

        if (model instanceof Product) {
            const product = new ProductModel({
                category: parent,
                description: model.description,
                price: model.price,
                title: model.title,
            });
            return product
                .save();
        }

        const category = new CategoryModel({title: model.title, parent});
        return category
            .save()
            .then((c) =>
                Promise.all(
                    _.map<CategoryOrProduct, Promise<ICategory | IProduct>>(model.children,
                        (child) => save(child, c))).then(() => c));
    }

    return () =>
        fetcher
            .fetch(SHOP_HOST)
            .then(($) =>
                _.map<HTMLElement, string>($("div.categ-blk.blk > ul > li > a").toArray(),
                    (node) => $(node).attr("href")))
            .then((urls) =>
                Promise.all(
                    _.map<string, Promise<CategoryOrProduct>>(urls, (url) => crawl(url))))
            .then((categories) =>
                Promise.all(_.map<CategoryOrProduct, Promise<ICategory | IProduct>>((categories),
                    (c) => save(c, null))));
};
