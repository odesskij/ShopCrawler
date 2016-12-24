"use strict";

import jsdom = require("jsdom");
import {default as pool, Pool, PoolFactory, PoolOptions} from "./pool";

interface Client {
    fetch: (url: string) => Promise<JQueryStatic>;
}

interface JQueryAwareWindow extends Window {
    $: JQueryStatic;
}

export default class Fetcher {
    private static createClient(): Client {
        return {
            fetch(url: string) {
                return new Promise<JQueryStatic>((resolve, reject) =>
                    jsdom.env({
                        url,
                        done: (errors: Error[], window: JQueryAwareWindow) =>
                            errors ? reject(errors) : resolve(window.$),
                        scripts: ["http://code.jquery.com/jquery.js"],
                    }),
                );
            },
        };
    }

    protected pool: Pool<Client>;

    constructor(poolSize = 20) {

        const factory: PoolFactory<Client> = {
            create() {
                return new Promise<Client>((resolve, reject) =>
                    resolve(Fetcher.createClient()));
            },
            destroy() {
                return Promise.resolve();
            },
        };

        const options: PoolOptions = {
            max: poolSize,
            min: 0,
        };

        this.pool = pool.createPool<Client>(factory, options);
    }

    public fetch(url: string): Promise<JQueryStatic> {
        return this.pool
            .acquire()
            .then((client) =>
                client
                    .fetch(url)
                    .then((r) => {
                        this.pool.release(client);
                        return r;
                    }));

    }
}
