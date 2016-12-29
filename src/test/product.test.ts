"use strict";

import chaiHttp = require("chai-http");
import * as chai from "chai";
import * as _ from "lodash";
import {ICategory} from "../model/category";
import {IProduct} from "../model/product";
import app from "./app";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Product", () => {
    const Product = app.getContainer().get("@model/product");
    const Category = app.getContainer().get("@model/category");

    let product: IProduct;
    let product2: IProduct;
    let product3: IProduct;
    let category: ICategory;

    before("Database populate", () => {
        category = new Category({title: "category_1"});
        product = new Product({
            category,
            price: 100,
            title: "product_1",
        });
        product2 = new Product({
            category,
            price: 100,
            title: "product_2",
        });
        product3 = new Product({
            category,
            price: 100,
            title: "product_3",
        });

        return Promise
            .resolve()
            .then(() => category.save())
            .then(() => Promise.all(
                _.map([product, product2, product3], (p: IProduct) =>
                    p.save())));
    });

    it("/api/products/:id", () =>
        chai.request(app.getExpress())
            .get(`/api/products/${product._id}`)
            .then((res) => {
                const p = product.toJSON();
                expect(res.type).to.equal("application/json");
                expect(res.status).to.equal(200);
                expect(res.body).to.deep.equal({
                    _id: p._id,
                    category: {
                        _id: p.category._id,
                        title: "category_1",
                    },
                    price: 100,
                    title: "product_1",
                });
            }),
    );

    it("/api/products", () =>
        chai.request(app.getExpress())
            .get(`/api/products`)
            .query({perPage: 1, page: 1})
            .then((res) => {
                expect(res.type).to.equal("application/json");
                expect(res.status).to.equal(200);

                expect(res).to.have.header("x-total-entries");
                expect(res).to.have.header("x-page", "1");
                expect(res).to.have.header("x-per-page", "1");
            }),
    );
});
