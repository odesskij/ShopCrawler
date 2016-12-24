"use strict";

import _ = require("lodash");
import jsdom = require("jsdom");
import Category from "./crawler/model/category";
import Product from "./crawler/model/product";

import Fetcher from "./crawler/fetcher";

const SHOP_HOST = "https://murzik.in.ua";

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

fetcher
    .fetch(SHOP_HOST)
    .then(($) =>
        _.map<HTMLElement, string>($("div.categ-blk.blk > ul > li > a").toArray(),
            (node) => $(node).attr("href")))
    .then((urls) =>
        Promise.all(_.map(urls, (url) => crawl(url))));
