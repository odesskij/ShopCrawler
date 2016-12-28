"use strict";
/* tslint:disable no-console */

import * as argv from "argv";
import * as _ from "lodash";
import IApplication from "../app";
import IContainer from "../container";
import Kernel from "./kernel";

class ConsoleApplication implements IApplication {
    protected kernel: Kernel;
    protected commands: {[name: string]: () => Promise<any>} = {};

    constructor(kernel: Kernel) {
        this.kernel = kernel;
    }

    public run(): this {
        this.addCommand("help", () =>
            Promise.resolve().then(() =>
                console.log(["Usage: ", ..._.map(this.commands, (command, name) => ` * ${name}`)].join("\n"))));

        const args = argv.run();
        const command = args.targets[0] || "help";

        if (!this.commands[command]) {
            throw new Error("Undefined command");
        }

        this.commands[command]()
            .then(() => process.exit(0))
            .catch((reason) => {
                console.error(reason);
                process.exit(1);
            })
        ;

        return this;
    }

    public getContainer(): IContainer {
        return this.kernel.getContainer();
    }

    public addCommand(name: string, fn: () => Promise<any>): this {
        this.commands[name] = fn;
        return this;
    }
}

export default ConsoleApplication;
