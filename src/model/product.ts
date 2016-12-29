"use strict";

import * as mongoose from "mongoose";
import {MongooseThenable} from "mongoose";
import {PaginateModel} from "mongoose";
import {Model} from "mongoose";
import * as mongoosePaginate from "mongoose-paginate";
import {ICategory} from "./category";

export interface IProduct extends mongoose.Document {
    _id: string;
    category: ICategory;
    description: string;
    price: number;
    title: string;

    toJSON(): IProduct;
}

export const ProductSchema = new mongoose.Schema({
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    description: mongoose.Schema.Types.String,
    price: mongoose.Schema.Types.Number,
    title: mongoose.Schema.Types.String,
});

ProductSchema.plugin(mongoosePaginate);

ProductSchema.set("toJSON", {
    versionKey: false,
    transform(doc: ProductModel, ret: any, options: any) {
        ret._id = ret._id.toString();
        return ret;
    },
});

export type ProductModel = Model<IProduct> & PaginateModel<IProduct>;

export default (mongoose: MongooseThenable): ProductModel =>
    mongoose.model<IProduct>("Product", ProductSchema);
