"use strict";

const genericPool = (<GenericPool> require("generic-pool"));

export interface Pool<T> {
    acquire: () => Promise<T>;
    drain: () => Promise<any>;
    release: (resource: T) => any;
    clear: () => void;
}

export interface PoolOptions {
    min: number;
    max: number;
}

export interface PoolFactory<T> {
    create: () => Promise<T>;
    destroy: (resource: T) => Promise<any>;
}

interface GenericPool {
    createPool<T>(factory: PoolFactory<T>, options: PoolOptions): Pool<T>;
}

export default genericPool;
