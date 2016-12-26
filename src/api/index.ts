"use strict";

import * as express from "express";
import {IApplication} from "../core/app";

export default function (router: express.Router): express.Router {
    router.get("/", (req: express.Request, res: express.Response) =>
        res.json({msg: "Hello, Express!"}));
    return router;
}
