"use strict";

import * as mongoose from "mongoose";
import {MongooseThenable} from "mongoose";
import {Model} from "mongoose";
import {PaginateModel} from "mongoose";
import * as mongoosePaginate from "mongoose-paginate";

export interface ICategory extends mongoose.Document {
    _id: string;
    title: string;
    parent?: ICategory;

    toJSON(): ICategory;
}
export const CategorySchema = new mongoose.Schema({
    parent: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    title: mongoose.Schema.Types.String,
});

CategorySchema.plugin(mongoosePaginate);

CategorySchema.set("toJSON", {
    versionKey: false,
    transform(doc: CategoryModel, ret: any, options: any) {
        ret._id = ret._id.toString();
        return ret;
    },
});

export type CategoryModel = Model<ICategory> & PaginateModel<ICategory>;

export default (mongoose: MongooseThenable): CategoryModel =>
    mongoose.model<ICategory>("Category", CategorySchema);
