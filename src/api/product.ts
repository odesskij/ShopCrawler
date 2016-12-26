"use strict";

import * as express from "express";
import {IApplication} from "../core/app";

export default function (router: express.Router, app: IApplication): express.Router {

    const Product = app.get("@model/product");

    router.get("/api/products/:id", (req: express.Request, res: express.Response) =>
        Product
            .findOne({_id: req.params.id})
            .populate("category")
            .then((r) => res.json(r))
            .catch(() => res.status(404).send()));

    return router;
}
