"use strict";

var webpackConfig = require('./webpack-test.config.js');

module.exports = function(config) {
  config.set({

    webpack: webpackConfig,

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',

    frameworks: ['chai', 'mocha'],

    plugins: [
      'karma-chrome-launcher',
      'karma-chai-plugins',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-coverage',
      'karma-webpack'
    ],

    // list of files / patterns to load in the browser
    files: [
      "cfg/tests.bundle.js"
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "cfg/tests.bundle.js": ["webpack"]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    coverageReporter: {
      type: 'text',
      includeAllSources: true
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    failOnEmptyTestSuite: false,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};