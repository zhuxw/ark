"use strict";

var pages = require('./pages');
var getRC = require('./getRC');
var relativePath = '../webpack/';
var rc = getRC();

module.exports = {
  applyConfigs: function (config, argv, handlerNames) {
    handlerNames.forEach(function (handlerName) {
      if (handlerName) {
        require(relativePath + handlerName).config(config, argv, rc);
      }
    });

  },
  applyPageConfigs: function (config, argv, handlerNames) {
    var selectedPages = pages.get(!argv.all && argv.target);

    handlerNames.forEach(function (handlerName) {
      if (handlerName) {
        var handler = require(relativePath + handlerName).config;

        selectedPages.forEach(function (pageName) {
          handler(config, argv, rc, pageName);
        });
      }
    });

  }
};