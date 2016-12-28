"use strict";

import mongoose = require("mongoose");
import {MongooseThenable} from "mongoose";

// DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated,
// plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = Promise;

export default (host: string, port: string, name: string): MongooseThenable => {
    return mongoose.connect(`mongodb://${host}:${port}/${name}`);
};
