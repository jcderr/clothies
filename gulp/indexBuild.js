var paths = require('./paths');
var gulp = require('gulp');
var inject = require('gulp-inject');
var mainBowerFiles = require('gulp-main-bower-files');


exports.inject = function () {
  var scripts = gulp.src(paths.injectScripts, {read: false});
  var css = gulp.src(paths.injectCss, {read: false});
  var bower = gulp.src(paths.bower).pipe(mainBowerFiles({includeDev: true}));

  return gulp.src(paths.dev + 'index.html')
    .pipe(inject(css, {
      relative: true,
      ignorePath: '../'
    }))
    .pipe(inject(scripts, {
      name: 'scripts',
      relative: true,
      ignorePath: '../'
    }))
    .pipe(inject(bower, {
      name: 'bower',
      relative: true,
      ignorePath: '../bower_components/'
    }))
    .pipe(gulp.dest(paths.dev));
};
