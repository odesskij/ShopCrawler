"use strict";

import chaiHttp = require("chai-http");
import * as chai from "chai";
import * as _ from "lodash";
import {ICategory} from "../model/category";
import {IProduct} from "../model/product";
import app from "./app";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Category", () => {
    const Category = app.getContainer().get("@model/category");

    let category1: ICategory;
    let category2: ICategory;
    let category3: ICategory;

    before("Database populate", () => {
        category1 = new Category({title: "category_1", parent: null});
        category2 = new Category({title: "category_2", parent: category1});
        category3 = new Category({title: "category_3", parent: category2});

        return Promise
            .resolve()
            .then(() => Promise.all(
                _.map([category1, category2, category3], (c: ICategory) =>
                    c.save())));
    });

    it("/api/categories/:id", () =>
        chai.request(app.getExpress())
            .get(`/api/categories/${category1._id}`)
            .then((res) => {
                expect(res.type).to.equal("application/json");
                expect(res.status).to.equal(200);

                const c1 = category1.toJSON();
                const c2 = category2.toJSON();
                const c3 = category3.toJSON();

                expect(res.body.title).to.equal(c1.title);
                expect(res.body._id).to.equal(c1._id);
                expect(res.body.parent).to.equal(null);
                expect(res.body.children).length(1);
                expect(res.body.children[0].title).to.equal(c2.title);
                expect(res.body.children[0]._id).to.equal(c2._id);
                expect(res.body.children[0].parent).to.equal(c1._id);
                expect(res.body.children[0].children).length(1);
                expect(res.body.children[0].children[0].title).to.equal(c3.title);
                expect(res.body.children[0].children[0]._id).to.equal(c3._id);
                expect(res.body.children[0].children[0].parent).to.equal(c2._id);
                expect(res.body.children[0].children[0].children).length(0);

            }),
    );

    it("/api/categories", () =>
        chai.request(app.getExpress())
            .get(`/api/categories`)
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
