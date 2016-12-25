"use strict";

import mongoose = require("mongoose");
import config from "./config";

// DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated,
// plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = Promise;

mongoose.connect(`mongodb://${config.database.host}:${config.database.port}/${config.database.name}`);

export default mongoose;
