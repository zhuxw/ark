"use strict";
var jshint = require('gulp-jshint');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

gulp.task('lint:ark', function() {
  var src = [
    'src/**/*.js',
    'gulpfile.js',
    '!**/templates/**/*.js'
  ];

  return gulp.src(src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('pre-test', function() {
  return gulp.src([
      'src/**/*.js',
      '!**/templates/**/*.js'
    ])
    // Covering files
    .pipe(istanbul({
      includeUntested: true
    }))
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function() {
  return gulp.src([
      'test/specs/init.spec.js',
      'test/specs/page.spec.js',
      'test/specs/venus.spec.js',
      'test/specs/comp.spec.js',
      'test/specs/mock.spec.js',
      'test/specs/install.spec.js'
    ])
    .pipe(mocha({
      timeout: 1000 * 60
    }))
    .pipe(istanbul.writeReports({
      reporters: ['text', 'text-summary', 'html']
    }));
});

gulp.task('lint', ['lint:ark']);
gulp.task('default', ['lint', 'test']);