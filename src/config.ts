"use strict";

export default {
    database: {
        host: process.env.DATABASE_HOST,
        name: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT,
    },
    env: process.env.NODE_ENV,
    port: process.env.PORT,
};
