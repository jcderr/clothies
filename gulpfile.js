var paths = require('./gulp/paths');
var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var ngConstant = require('gulp-ng-constant');
var rename = require('gulp-rename');
var gulpSequence = require('gulp-sequence');
var templateCache = require('gulp-angular-templatecache');
var del = require('del');
var jsBuild = require('./gulp/jsBuild');
var cssBuild = require('./gulp/cssBuild');
var indexBuild = require('./gulp/indexBuild');



gulp.task('jsBuild', jsBuild.getDev());
gulp.task('jsReleaseBuild', jsBuild.release);
gulp.task('cssBuild', cssBuild.getDev());
gulp.task('cssReleaseBuild', cssBuild.release);
gulp.task('indexBuild', indexBuild.inject);




// --- Main tasks --------------------

gulp.task('default', gulpSequence('buildLocal', ['nodemon', 'watch']));
gulp.task('buildLocal', gulpSequence(
  'clean',
  [
    'jsBuild',
    'cssBuild',
    'copyPartials'
  ],
  'indexBuild'
));


gulp.task('clean', function () {
  return del(paths.dev);
});

gulp.task('copyPartials', function () {
  return gulp.src(paths.partials, {base: paths.src})
    .pipe(gulp.dest(paths.dev));
});

gulp.task('buildTemplateCache', function () {
  return gulp.src(paths.partials, {base: paths.src})
    .pipe(templateCache({module: 'Super', root: 'app'}))
    .pipe(gulp.dest(paths.build));
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'server/server.js',
    ignore: ['app/', 'gulp/', 'bower_components/', 'public/', 'config/']
  });
});





// --- Watch tasks ---------------

gulp.task('watch', function () {
  gulp.watch(paths.scripts, function (event) {
    jsBuild.getDev(event.path)()
      .on('end', function () {
        if (event.type === 'added') { indexBuild.inject(); }
      });
  });

  gulp.watch(paths.css, function (event) {
    cssBuild.getDev(event.path)()
      .on('end', function () {
        if (event.type === 'added') { indexBuild.inject(); }
      });
  });

  gulp.watch(paths.partials, function (event) {
    gulp.src(event.path, {base: paths.src})
      .pipe(gulp.dest(paths.dev))
      .on('end', function () {
        gutil.log(gutil.colors.green('✔ Partials Task'), 'Finished');
      });
  });
});
