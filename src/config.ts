"use strict";
import IConfig from "./core/config";

export default (<IConfig> {
    database: {
        host: process.env.DATABASE_HOST,
        name: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT,
    },
    env: process.env.NODE_ENV || "dev",
    port: process.env.PORT,
});
