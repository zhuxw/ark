"use strict";
var path = require('path');

module.exports = {
  config: function (config, argv, rc) {
    var alias = {
      root: path.resolve(__dirname, '../..'),
      src: path.resolve(__dirname, '../../src'),
      common: path.resolve(__dirname, '../../src/_common')
    };

    config.resolve = {
      alias: alias,
      extensions: ['.vue', '.json', '.js', '.jsx', '.webpack.js']
    };
  }
};