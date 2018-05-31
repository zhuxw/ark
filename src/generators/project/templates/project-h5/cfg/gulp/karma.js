"use strict";
var gulp = require('gulp');
var path = require('path');

var karma;
try {
  karma = require('karma');
} catch (e) {}

function test(configFile, singleRun, done) {
  if (karma) {
    var oldEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'test';

    new karma.Server({
      configFile: configFile,
      singleRun: singleRun
    }, function(error) {
      process.env.NODE_ENV = oldEnv;

      if (error) {
        console.error('Karma returned with the error code: ' + error);
      }
      done();
    }).start();
  } else {
    done();
  }
}

gulp.task('karma:ci', function(done) {
  test(path.join(__dirname, '../karma-ci.conf.js'), true, done);
});

gulp.task('karma:ttd', function(done) {
  test(path.join(__dirname, '../karma-dev.conf.js'), false, done);
});