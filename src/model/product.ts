"use strict";

import mongoose from "../mongoose";
import {ICategory} from "./category";

export interface IProduct extends mongoose.Document {
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

const Product =  mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
