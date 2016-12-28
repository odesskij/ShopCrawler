"use strict";
/* tslint:disable no-console */

import config from "../config";
import Application from "../core/app/console";
import Kernel from "../core/app/kernel";
import crawler from "../crawler";

const kernel = new Kernel(config);
const app = new Application(kernel);

app
    .addCommand("crawler", crawler(app))
    .run();
