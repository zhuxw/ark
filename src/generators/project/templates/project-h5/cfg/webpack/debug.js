"use strict";
var webpack = require('webpack');

module.exports = {
  config: function (config, argv) {
    if (!argv.release) {
      config.devtool = 'source-map';
      config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }
  }
};