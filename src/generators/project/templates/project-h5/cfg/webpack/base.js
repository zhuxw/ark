"use strict";

var path = require('path');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  config: function (config, argv) {
    Object.assign(config, {
      mode: argv.release ? 'production' : 'development',
      entry: {},
      output: {
        path: path.join(__dirname, '../../build'),
        filename: '[name].js',
        publicPath: '/',
        sourceMapFilename: '[file].map'
      },
      module: {
        rules: []
      },
      plugins: [
        new ProgressBarPlugin()
      ]
    });
  }
};