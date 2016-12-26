"use strict";

import mongoose = require("mongoose");
import {MongooseThenable} from "mongoose";
import {IConfig} from "./core/app";

// DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated,
// plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = Promise;

export default (config: IConfig): MongooseThenable => {
    return mongoose.connect(`mongodb://${config.database.host}:${config.database.port}/${config.database.name}`);
};
