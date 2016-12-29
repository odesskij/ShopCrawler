"use strict";

import * as _ from "lodash";
import config from "../config";
import Application from "../core/app/http";
import Kernel from "../core/app/kernel";

const kernel = new Kernel(_.extend(_.clone(config), {env: "test"}));
const app = new Application(kernel);
app.initialize();

export default app;
