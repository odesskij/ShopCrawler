"use strict";

export default class ReferenceError extends Error {
    /**
     * @param ref
     */
    constructor(ref: string) {
        super(`Undefined reference: ${ref}`);
    }
}
