"use strict";

import * as express from "express";
import * as _ from "lodash";
import IApplication from "../core/app";
import {ICategory} from "../model/category";

export default function (router: express.Router, app: IApplication): express.Router {

    const Category = app.getContainer().get("@model/category");
    const redis = app.getContainer().get("redis");

    function getCategoryTree(parent: ICategory): Promise<ICategory> {
        return Category
            .find({parent: parent._id})
            .then((r) => Promise.all(_.map(r, (p) => getCategoryTree(p))))
            .then((r) => _.extend(parent.toJSON(), {children: r}));
    }

    router.get("/api/categories/:id", redis.middleware(5 * 60), (req: express.Request, res: express.Response) =>
        Category
            .findOne({_id: req.params.id})
            .then((parent) => getCategoryTree(parent))
            .then((r) =>
                res
                    .json(r))
            .catch(() =>
                res
                    .status(404)
                    .send()));

    router.get("/api/categories", (req: express.Request, res: express.Response) => {

        const limit = (+req.query.perPage) || 10;
        const offset = (req.query.page ? +req.query.page - 1 : 0) * limit;

        Category
            .paginate({parent: null}, {offset, limit})
            .then((r) =>
                res
                    .set("x-total-entries", `${r.total}`)
                    .set("x-page", `${req.query.page || 1}`)
                    .set("x-per-page", `${limit}`)
                    .json(_.map(r.docs, (x: ICategory) => x.toJSON())))
            .catch(() =>
                res
                    .status(500)
                    .send());
    });
    return router;
}
