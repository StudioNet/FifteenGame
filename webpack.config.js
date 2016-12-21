var path = require("path");

module.exports = {
    cache: true,
    debug: true,
    devtool: "eval",
    entry: "./dist/js/app-empty.js",
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "app.min.js"
    },
    resolve: {
        extensions: ['','.js']
    }
}