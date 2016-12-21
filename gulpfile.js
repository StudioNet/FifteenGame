var gulp      = require('gulp');
var compiler  = require('gulp-typescript');
var merge     = require('gulp-merge');
var uglify    = require('gulp-uglify');
var wrench    = require('wrench');

require("./gulps/tasks");

// var tsProject = compiler.createProject({
//   declarationFiles: true,
//   noExternalResolve: true
// });

// wrench.readdirSyncRecursive('./gulps')
//         .filter(function(file) {
//             return (/\.(js)$/i).test(file);
//         })
//         .map(function(file) {
//             require('./gulps/' + file);
// });

// gulp.task('default', ['webserver', 'watchWebPack']);

// gulp.task('default', function() {
//   var tsResult = gulp.src('App/Modules/member/*.ts')
//                      .pipe(compiler(tsProject));
// 
//    return merge([
//         tsResult.dts.pipe(gulp.dest('App/Modules/member/definitations/')),
//         tsResult.js.pipe(gulp.dest('App/Modules/member/js/'))
//    ]);
// });
// 
// gulp.task('minify', function() {
//   gulp.src('App/Modules/member/js/members.js')
//       .pipe(uglify())
//       .pipe(gulp.dest('App/Modules/member/minis/'));
// });
