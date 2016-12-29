"use strict";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as http from "http";
import * as _ from "lodash";
import * as logger from "morgan";
import IApplication from "../app";
import IContainer from "../container";
import Kernel from "./kernel";

import categoryRoute from "../../api/category";
import indexRoute from "../../api/index";
import productRoute from "../../api/product";

class HTTPApplication implements IApplication {
    protected kernel: Kernel;
    protected express: express.Application;
    protected log: (msg: string) => void;

    constructor(kernel: Kernel) {
        this.kernel = kernel;

        /* Only a void function can be called with the 'new' keyword.*/
        /* 'new' expression, whose target lacks a construct signature, implicitly has an 'any' type. */
        this.express = new (<any> express)();
    }

    public getExpress(): express.Application {
        return this.express;
    }

    public  getContainer(): IContainer {
        return this.kernel.getContainer();
    }

    public initialize(): this {
        /* tslint:disable no-console */
        this.log = (msg: string) => console.log(msg);

        if (this.kernel.getConfig().env === "dev") {
            this.getExpress().use(logger("dev"));
        }

        // use json form parser middleware
        this.getExpress().use(bodyParser.json());

        // use query string parser middleware
        this.getExpress().use(bodyParser.urlencoded({
            extended: true,
        }));

        _.each<(r: express.Router, app: IApplication) => any>([
            indexRoute,
            productRoute,
            categoryRoute,
        ], (define) =>
            this.getExpress().use(define(express.Router(), this)));

        this.getExpress().set("port", this.kernel.getConfig().port);

        return this;
    }

    public run(): this {
        this.initialize();
        this.createHTTPServer();
        return this;
    }

    protected createHTTPServer(): this {
        const httpServer = http.createServer(this.getExpress());
        const PORT = this.kernel.getConfig().port;
        httpServer.listen(PORT);

        httpServer.on("error", (error: any) => {
            if (error.syscall !== "listen") {
                throw error;
            }
            // handle specific listen errors with friendly messages
            switch (error.code) {
                case "EADDRINUSE":
                    console.error(`Port ${PORT} is already in use`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });

        httpServer.on("listening", () =>
            this.log(`Listening on port ${httpServer.address().port}`));

        return this;
    }
}

export default HTTPApplication;
