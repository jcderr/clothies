var paths = require('./paths');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var wrap = require("gulp-wrap");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var rename = require("gulp-rename");
var gutil = require('gulp-util');
var ngAnnotate = require('gulp-ng-annotate');



exports.getDev = function (srcs) {
  srcs = srcs || paths.scripts;

  return function dev() {
    return gulp.src(srcs, {base: paths.src})
      .pipe(wrap('(function(){"use strict";<%= contents %>}());'))
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(gulp.dest(paths.dev))
      .on('end', function() {
        gutil.log(gutil.colors.green('✔ JS Dev'), 'Finished');
      });
  };
}


exports.release = function () {
  return gulp.src(paths.scripts)
    .pipe(wrap('(function(){"use strict";<%= contents %>}());'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(stripDebug())
    .pipe(gulp.dest(paths.build))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest(paths.build))
    .on('end', function() {
      gutil.log(gutil.colors.green('✔ JS build'), 'Finished');
    });
}
