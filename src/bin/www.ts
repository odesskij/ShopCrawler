"use strict";

import config from "../config";
import Application from "../core/app/http";
import Kernel from "../core/app/kernel";

const kernel = new Kernel(config);
const app = new Application(kernel);
app.run();
