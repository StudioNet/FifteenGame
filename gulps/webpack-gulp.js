var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("../webpack.config.js");
var stream = require('webpack-stream');

var paths = {
    HTML       : "views/index.html",
    ALL        : ["dist/**/*.js"],
    MIN_OUT    : "build.min.js",
    DEST       : "dist",
    DEST_SRC   : "dist/js",
    DEST_BUILD : "dist/build"
}

gulp.task('webpack', [], function() {
    return gulp.src(paths.ALL)
               .pipe(sourcemaps.init())
               .pipe(stream(webpackConfig))
               .pipe(sourcemaps.write())
               .pipe(gulp.dest(paths.DEST_BUILD));
});

gulp.task('webserver', function(callback) {
    var configuration = Object.create(webpackConfig);
        configuration.debug = true;
        configuration.devtool = "eval";

    new WebpackDevServer(webpack(configuration), {
            publicPath: "/" + configuration.output.publicPath,
            stats: { colors: true }
        })
        .listen(8080, "localhost", function (err) {
            if (err) {
                throw new gutil.PluginError("webpack-server", err);
            }
            gutil.log("[webpack-server]", "http://localhost:8080/webpack-dev-server/index.html");
        });
});

gulp.task('watchWebPack', function() {
    gulp.watch(paths.ALL, ["webpack"]);
});