"use strict";
var express = require("express");
var webpack = require("webpack");
var path = require("path");
var webpackConfig = require("../gulps/webpack.config")(false);
var webpackMiddleware = require("webpack-dev-middleware");
var app = express();
registerWebpackMiddleware();
registerStaticFiles();
registerReturnAlwaysIndexHtml();
app.listen(8080);
function registerReturnAlwaysIndexHtml() {
    app.use(function (req, res) {
        res.sendFile(path.join(__dirname, "../index.html"));
    });
}
function registerWebpackMiddleware() {
    var webpackMiddlewareConfig = {
        publicPath: "/",
        stats: {
            chunks: false,
            chunkModules: false,
            colors: true
        },
    };
    //
    //  Assets are created inside memory
    //  path has no meaning
    //
    webpackConfig.output.path = "/";
    var webpackCompiler = webpack(webpackConfig);
    app.use(webpackMiddleware(webpackCompiler, webpackMiddlewareConfig));
}
function registerStaticFiles() {
    var staticPath = path.join(__dirname, "../");
    app.use(express.static(staticPath));
}
//# sourceMappingURL=app.js.map