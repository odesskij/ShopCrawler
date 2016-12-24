'use strict';

module.exports = {
    entry:  {},
    output: {
        filename: "[name].js",
        path:     __dirname + "/dist"
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: "awesome-typescript-loader" }
        ]
    }
};
