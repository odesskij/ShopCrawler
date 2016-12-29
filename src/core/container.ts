"use strict";

import {MongooseThenable} from "mongoose";
import {CategoryModel} from "../model/category";
import {ProductModel} from "../model/product";
import {RedisMiddleware} from "../redis";

interface IContainer {
    get(ref: "mongoose"): MongooseThenable;
    get(ref: "redis"): {middleware: RedisMiddleware};
    get(ref: "@model/category"): CategoryModel;
    get(ref: "@model/product"): ProductModel;
}

export default IContainer;
