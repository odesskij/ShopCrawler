"use strict";

interface IConfig {
    database: {
        host: string;
        name: string;
        port: string;
    };
    env: "prod" | "test" | "dev";
    port: number;
    redis: {
        host: string;
        port: number;
        prefix: string;
    };
}

export default IConfig;
