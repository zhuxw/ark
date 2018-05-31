"use strict";

var gulp = require('gulp');
var sequence = require('gulp-sequence');
var connect = require('gulp-connect');
var del = require('del');
var path = require('path');

var argv = require('./util/argv')();
var pages = require('./util/pages');
var getValidPort = require('./util/getValidPort');
var getRC = require('./util/getRC');
var DIST_PATH_FULL = path.join(__dirname, '../build');

// 引入各个工具对应的task
require('./gulp/eslint');
require('./gulp/webpack');
require('./gulp/karma');

// 启动一个位于build目录的简单http服务器
gulp.task('serve', function() {
  console.log('[connect]', "serve from: " + DIST_PATH_FULL);

  var host = '0.0.0.0';
  var port = parseInt(argv.port);
  getValidPort(host, port, function(port) {
    connect.server({
      root: DIST_PATH_FULL,
      port: port
    });
  });
});

// 清理build目录
gulp.task('clean', function() {
  var selectedPages = pages.get(!argv.all && argv.target);
  selectedPages.push('_common');
  var targets = selectedPages.map(function(pageName) {
    return DIST_PATH_FULL + '/' + pageName + '/**';
  });
  targets.push('!' + DIST_PATH_FULL);

  console.log('[clean]', 'Deleting: ' + selectedPages);
  del.sync(targets);
});

// 检查语法
gulp.task('lint', ['eslint:src', 'eslint:test']);

// 执行一遍单元测试
gulp.task('test', function(done) {
  sequence('lint', 'karma:ci', done);
});

// 启动karma服务器监控文件变化，随时执行单元测试
gulp.task('ttd', function(done) {
  sequence('lint', 'karma:ttd', done);
});

// 使用webpack-dev-server进行实时编译和调试
gulp.task('debug', function(done) {
  sequence('lint', 'webpack:serve', done);
});

// 使用webpack编译到build目录
gulp.task('build', function(done) {
  sequence('test', 'clean', 'webpack:build', done);
});

// 默认执行debug命令
gulp.task('default', [
  'debug'
]);