"use strict";
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  config: function (config, argv, rc) {
    var styleLoader = rc.framework === 'vue' ? 'vue-style-loader' : 'style-loader';

    config.module.rules.push({
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: styleLoader,
        use: [{
          loader: "css-loader",
          options: {
            minimize: true,
            sourceMap: true
          }
        }]
      })
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: styleLoader,
        use: [{
          loader: "css-loader",
          options: {
            minimize: true,
            autoprefixer: false,
            sourceMap: true
          }
        }, {
          loader: "postcss-loader",
          options: {
            config: {
              path: path.resolve(__dirname, '../postcss.config.js')
            }
          }
        }, {
          loader: "sass-loader"
        }]
      })
    });

    // 独立CSS文件
    config.plugins.push(new ExtractTextPlugin('[name].css', {
      disable: false,
      allChunks: true
    }));
  }
};