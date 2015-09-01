var gulp = require('gulp');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var paths = require('../paths');
var assign = Object.assign || require('object.assign');
var uglify = require('gulp-uglify');

gulp.task('build-es6', function () {
  var tsProject = ts.createProject('tsconfig.json', {
    target: 'es6'
  });
  return gulp.src(paths.source)
    .pipe(ts(tsProject))
    .pipe(gulp.dest(paths.output + 'es6'));
});

gulp.task('build-commonjs', function () {
  var tsProject = ts.createProject('tsconfig.json', {
    module: 'commonjs'
  });
  return gulp.src(paths.source)
    .pipe(ts(tsProject))
    .pipe(uglify())
    .pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-amd', function () {
  var tsProject = ts.createProject('tsconfig.json', {
    module: 'amd'
  });
  return gulp.src(paths.source)
    .pipe(ts(tsProject))
    .pipe(uglify())
    .pipe(gulp.dest(paths.output + 'amd'));
});

gulp.task('build-system', function () {
  var tsProject = ts.createProject('tsconfig.json', {
    module: 'system'
  });
  return gulp.src(paths.source)
    .pipe(ts(tsProject))
    .pipe(uglify())
    .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-es6', 'build-commonjs', 'build-amd', 'build-system'],
    callback
  );
});
