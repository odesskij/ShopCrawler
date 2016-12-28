"use strict";

import IContainer from "./container";

export interface IApplication {
    run(): this;
    getContainer(): IContainer;
}

export default IApplication;
