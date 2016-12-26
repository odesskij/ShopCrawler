"use strict";

import * as mongoose from "mongoose";
import {MongooseThenable} from "mongoose";
import {Model} from "mongoose";
import {ICategory} from "./category";

export interface IProduct extends mongoose.Document {
    _id: string;
    category: ICategory;
    description: string;
    price: number;
    title: string;
}

export const ProductSchema = new mongoose.Schema({
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    description: mongoose.Schema.Types.String,
    price: mongoose.Schema.Types.Number,
    title: mongoose.Schema.Types.String,
});

export type ProductModel = Model<IProduct>;

export default (mongoose: MongooseThenable): ProductModel =>
    mongoose.model<IProduct>("Product", ProductSchema);
