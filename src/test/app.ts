"use strict";

import * as _ from "lodash";
import Application from "../app";
import config from "../config";

const app = new Application(_.defaults(_.clone(config), {env: "test"}));
const expressApp = app.initialize().app;
export default expressApp;
