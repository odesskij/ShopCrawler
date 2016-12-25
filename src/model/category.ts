"use strict";

import mongoose from "../mongoose";

import {IProduct} from "./product";

export interface ICategory extends mongoose.Document {
    title: string;
    parent?: ICategory;
}
export const CategorySchema = new mongoose.Schema({
    parent: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    title: mongoose.Schema.Types.String,
});

const Category = mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
