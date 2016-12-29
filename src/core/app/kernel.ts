"use strict";
import IConfig from "../config";
import IContainer from "../container";
import Container from "../container/container";

import category from "../../model/category";
import product from "../../model/product";
import mongoose from "../../mongoose";
import redis from "../../redis";

export default class Kernel {
    protected config: IConfig;
    protected container: Container;

    constructor(config: IConfig) {
        this.config = config;
        this.container = new Container();
        this.initialize();
    }

    public initialize(): this {

        this.container.add("mongoose",
            mongoose(
                this.config.database.host,
                this.config.database.port,
                this.config.database.name,
            ),
        );

        this.container.add("@model/category", category(this.getContainer().get("mongoose")));
        this.container.add("@model/product", product(this.getContainer().get("mongoose")));

        this.container.add("redis", redis(
            this.getConfig().redis.host,
            this.getConfig().redis.port,
            this.getConfig().redis.prefix,
        ));

        return this;
    }

    public getConfig(): IConfig {
        return this.config;
    }

    public getContainer(): IContainer {
        return this.container;
    }
}
