"use strict";

import * as express from "express";
import * as _ from "lodash";
import IApplication from "../core/app";
import {IProduct} from "../model/product";

export default function (router: express.Router, app: IApplication): express.Router {

    const Product = app.getContainer().get("@model/product");

    router.get("/api/products/:id", (req: express.Request, res: express.Response) =>
        Product
            .findOne({_id: req.params.id})
            .populate("category")
            .then((r) => res
                .json(r.toJSON()))
            .catch(() =>
                res
                    .status(404)
                    .send()));

    router.get("/api/products", (req: express.Request, res: express.Response) => {

        const limit = (+req.query.perPage) || 10;
        const offset = (req.query.page ? +req.query.page - 1 : 0) * limit;

        Product
            .paginate({}, {
                offset,
                limit,
                populate: "category",
            })
            .then((r) =>
                res
                    .set("x-total-entries", `${r.total}`)
                    .set("x-page", `${req.query.page || 1}`)
                    .set("x-per-page", `${limit}`)
                    .json(_.map(r.docs, (x: IProduct) => x.toJSON())))
            .catch(() =>
                res
                    .status(500)
                    .send());
    });
    return router;
}
