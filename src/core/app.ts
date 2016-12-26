"use strict";

import * as Express from "express";
import * as mongoose from "mongoose";
import {CategoryModel} from "../model/category";
import {ProductModel} from "../model/product";

export interface IApplication {
    app: Express.Application;

    get(service: "mongoose"): mongoose.MongooseThenable;
    get(service: "@model/category"): CategoryModel;
    get(service: "@model/product"): ProductModel;
}

export interface IConfig {
    env: "prod" | "test" | "dev";
    database: {
        host: string,
        name: string,
        port: string,
    };
    port: number;
}

export default IApplication;
