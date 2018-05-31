"use strict";
var fs = require('fs');
var path = require('path');
var cwd = process.cwd();
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  config: function (config, argv, rc, pageName) {
    var from = './src/' + pageName + '/assets';
    var fromPath = path.join(cwd, from);
    if (fs.existsSync(fromPath)) {
      config.plugins.push(new CopyWebpackPlugin([{
        from: './src/' + pageName + '/assets',
        to: '../build/' + pageName + '/assets'
      }]));
    }
  }
};