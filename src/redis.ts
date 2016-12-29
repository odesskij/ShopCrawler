"use strict";

import * as express from "express";
import * as redis from "redis";

export type RedisMiddleware = {
    (ttl: number): (req: express.Request, res: express.Response, next: express.NextFunction) => void;
};

export default function (host: string, port: number, prefix: string) {
    const client = redis.createClient({host, port, prefix});

    function cacheResponse(req: express.Request, res: any, next: express.NextFunction, key: string, ttl: number) {
        // hack
        res._end = res.end;
        res.end = (content: Buffer, encoding: any) => {
            if (content) {
                client.set(key, JSON.stringify({body: JSON.parse(content.toString())}));
                client.expire(ttl);
            }
            return res._end(content, encoding);
        };
    }

    return {
        middleware(ttl: number) {
            return (req: express.Request, res: express.Response, next: express.NextFunction) => {
                function bypass() {
                    res.set("x-cache", "BYPASS");
                    next();
                }

                res.set("x-cache", "HIT");

                const key = req.originalUrl || req.url;

                client.get(key, (err: any, reply: string) => {
                    if (reply) {
                        try {
                            const r = JSON.parse(reply);
                            res.json(r.body);
                        } catch (e) {
                            cacheResponse(req, res, next, key, ttl);
                            bypass();
                        }

                        return;
                    }

                    cacheResponse(req, res, next, key, ttl);
                    bypass();
                });
            };
        },
    };
}
