var paths = require('./paths');
var gulp = require('gulp');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');



exports.getDev = function (srcs) {
  srcs = srcs || paths.css;

  return function dev() {
    return gulp.src(srcs, {base: paths.src})
      .pipe(plumber())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest(paths.dev))
      .on('end', function(){
        gutil.log(gutil.colors.green('✔ CSS dev'), 'Finished');
      });
  };
};


exports.release = function () {
  return gulp.src(paths.css)
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.build))
    .pipe(cssnano())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest(paths.build))
    .on('end', function(){
      gutil.log(gutil.colors.green('✔ CSS Build'), 'Finished');
    });
};
