"use strict";
const gulp = require("gulp");
const path = require("path");
const configurator = require("./configurator");
const Build = require("./build");

const builder = createBuilder();

function createBuilder() {
    const baseDir = path.join(__dirname, "..");

    const config = configurator.create({
        baseDir: baseDir,
    });

    return new Build(config);
}

gulp.task("dev", function() {
    return builder.dev();
});

gulp.task("prod", function() {
    return builder.prod();
});

gulp.task("test", function() {
    return builder.test();
});

gulp.task("lint", function() {
    return builder.lint();
});

gulp.task("compile-client", function() {
    return builder.compileClient();
});

gulp.task("compile-server", function() {
    return builder.compileServer();
});

gulp.task("pack", function() {
    return builder.compileServer();
});
