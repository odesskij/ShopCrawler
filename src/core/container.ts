"use strict";

import {MongooseThenable} from "mongoose";
import {CategoryModel} from "../model/category";
import {ProductModel} from "../model/product";

interface IContainer {
    get(ref: "mongoose"): MongooseThenable;
    get(ref: "@model/category"): CategoryModel;
    get(ref: "@model/product"): ProductModel;
}

export default IContainer;
