"use strict";

import * as mongoose from "mongoose";
import {MongooseThenable} from "mongoose";
import {Model} from "mongoose";

export interface ICategory extends mongoose.Document {
    _id: string;
    title: string;
    parent?: ICategory;
}
export const CategorySchema = new mongoose.Schema({
    parent: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    title: mongoose.Schema.Types.String,
});

export type CategoryModel = Model<ICategory>;

export default (mongoose: MongooseThenable): CategoryModel =>
    mongoose.model<ICategory>("Category", CategorySchema);
