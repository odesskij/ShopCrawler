"use strict";
/* tslint:disable no-console */

import * as argv from "argv";
import * as _ from "lodash";
import Application from "../app";
import config from "../config";
import {IApplication} from "../core/app";
import {ICommand} from "../core/cli";
import crawlerCommand from "../crawler";

const app: IApplication = new Application(config).initialize();

interface Commands {
    [name: string]: ICommand | undefined;
}

const commands: Commands = {
    crawler: <ICommand> crawlerCommand(app),
    help: () => Promise
        .resolve()
        .then(() =>
            console.log("Commands list: "))
        .then(() =>
            _.each(commands, (command, name) => console.log(`* ${name}`))),
};

const args = argv.run();
const command: ICommand = commands[args.targets[0]];

if (command) {
    command()
        .then(() => {
            process.exit(0);
        })
        .catch((reason: any) => {
            console.error(reason);
            process.exit(1);
        });
} else {
    console.error("Command not found.");
    process.exit(1);
}
