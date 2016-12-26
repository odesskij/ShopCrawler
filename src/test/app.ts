"use strict";

import * as Express from "express";
import * as _ from "lodash";
import Application from "../app";
import config from "../config";
import {IApplication} from "../core/app";

const app: IApplication = new Application(_.defaults(_.clone(config), {env: "test"}))
    .initialize();

export default app;
export const express: Express.Application = app.app;
