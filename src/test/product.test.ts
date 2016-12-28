"use strict";

import chaiHttp = require("chai-http");
import * as chai from "chai";
import {ICategory} from "../model/category";
import {IProduct} from "../model/product";
import app from "./app";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Product", () => {
    const Product = app.getContainer().get("@model/product");
    const Category = app.getContainer().get("@model/category");

    let product: IProduct;
    let category: ICategory;

    before("Database populate", () => {
        category = new Category({title: "category_1"});
        product = new Product({
            category,
            price: 100,
            title: "product_1",
        });

        return Promise
            .resolve()
            .then(() => category.save())
            .then(() => product.save());
    });

    it("/api/products/:id", () =>
        chai.request(app.getExpress())
            .get(`/api/products/${product._id}`)
            .then((res) => {

                expect(res.body).to.eql({
                    _id: product._id,
                    category: {
                        _id: category._id,
                        title: "category_1",
                    },
                    price: 100,
                    title: "product_1",
                });
                expect(res.type).to.eql("application/json");
            }));
});
