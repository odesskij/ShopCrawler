"use strict";

import * as express from "express";

export default function (app: express.Router) {
    app.get("/", (req: express.Request, res: express.Response) =>
        res.json({msg: "Hello, Express!"}));
    return app;
}
