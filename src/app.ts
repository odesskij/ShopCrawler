"use strict";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as http from "http";
import * as _ from "lodash";
import * as logger from "morgan";

import indexRoute from "./api/index";

interface Config {
    env: "prod" | "test" | "dev";
    database: {
        host: string,
        name: string,
        port: string,
    };
    port: number;
}

export default class Application {
    public app: express.Application;
    protected log: (msg: string) => void;

    protected config: Config;
    protected HTTP_PORT: number;

    constructor(config: Config) {
        /* Only a void function can be called with the 'new' keyword.*/
        /* 'new' expression, whose target lacks a construct signature, implicitly has an 'any' type. */
        this.app = new (<any> express)();
        this.config = config;
        this.HTTP_PORT = config.port;
        /* tslint:disable no-console */
        this.log = (msg: string) => console.log(msg);
    }

    public initialize(): this {
        this.middleware();
        this.routes();
        return this;
    };

    public HTTPListen(): this {
        this.createHTTPServer();
        return this;
    }

    protected middleware() {
        // use logger middleware
        if (this.config.env === "dev") {
            this.app.use(logger("dev"));
        }

        // use json form parser middleware
        this.app.use(bodyParser.json());

        // use query string parser middleware
        this.app.use(bodyParser.urlencoded({
            extended: true,
        }));

        return this;
    }

    protected routes(): this {

        _.each<(r: express.Router) => express.Router>(
            [
                indexRoute,
            ], (define) =>
                this.app.use(define(express.Router())));

        return this;

    }

    protected createHTTPServer(): this {
        const httpServer = http.createServer(this.app);

        this.app.set("port", this.HTTP_PORT);
        httpServer.listen(this.HTTP_PORT);

        httpServer.on("error", (error: any) => {
            if (error.syscall !== "listen") {
                throw error;
            }
            // handle specific listen errors with friendly messages
            switch (error.code) {
                case "EADDRINUSE":
                    console.error(`Port ${this.HTTP_PORT} is already in use`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });

        httpServer.on("listening", () => {
            const addr = httpServer.address();
            this.log(`Listening on port ${addr.port}`);
        });

        return this;
    }
}
