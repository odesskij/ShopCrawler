"use strinct";

import * as _ from "lodash";
import IContainer from "../container";
import ReferenceError from "./reference-error";

export default class Container implements IContainer {

    private services: {[ref: string]: any} = {};

    /**
     * @param ref
     * @returns {any}
     */
    public get(ref: string): any {
        if (!_.includes(_.keys(this.services), ref)) {
            throw new ReferenceError(ref);
        }
        return this.services[ref];
    }

    /**
     * @param ref
     * @param service
     * @returns {Container}
     */
    public add(ref: string, service: any): this {
        this.services[ref] = service;
        return this;
    }
}
