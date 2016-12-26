'use strict';

const nodeExternals = require("webpack-node-externals");

module.exports = {
    entry:     {
        cli: "./src/bin/cli.ts",
        app: "./src/bin/www.ts",
    },
    target:    "node",
    externals: [nodeExternals()],
    output:    {
        filename: "[name].js",
        path:     __dirname + "/dist"
    },
    resolve:   {
        extensions: ["", ".ts", ".js"]
    },
    module:    {
        loaders: [
            { test: /\.ts$/, loader: "awesome-typescript-loader" }
        ]
    }
};
