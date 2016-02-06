'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const babel = require('gulp-babel');

gulp.task('default', (callback) => {
  runSequence('clean', 'create', callback);
});

gulp.task('clean', (callback) => {
  rimraf('./dist', callback);
});

gulp.task('create', () => {
  return gulp.src([
    // './js/config/common.js',
    // './js/config/design.js',
    // './js/config/twitter.js',
    //
    // './js/lib/is.js',
    './js/lib/utils.js',
    // './js/lib/twitter.js',
    // './js/lib/design.js',

    './js/controller.js',
    './js/main.js',
  ])
  .pipe(concat('main.gs'))
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('dist'));
});
