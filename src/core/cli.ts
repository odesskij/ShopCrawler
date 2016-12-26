"use strict";

export interface ICommand {
    (): Promise<any>;
}
