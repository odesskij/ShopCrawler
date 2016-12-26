"use strict";

import Application from "../app";
import config from "../config";

const app = new Application(config);
app.initialize()
    .HTTPListen();
