"use strict";

interface IConfig {
    database: {
        host: string,
        name: string,
        port: string,
    };
    env: "prod" | "test" | "dev";
    port: number;
}

export default IConfig;
