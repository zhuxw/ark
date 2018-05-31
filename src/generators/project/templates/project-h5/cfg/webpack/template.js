"use strict";

module.exports = {
  config: function (config, argv) {
    config.module.rules.push({
      test: /\.ejs$/,
      loader: "ejs-loader",
      options: {
        variable: "data",
        minify: true,
        minifierOptions: {
          collapseInlineTagWhitespace: true,
          conservativeCollapse: false,
          ignoreCustomFragments: [/<%[\s\S]*?%>/]
        }
      }
    }, {
      test: /\.html$/,
      loader: "underscore-loader",
      options: {
        minify: false,
        engineFull: 'var _ = { escape: require(\'lodash/escape\') };',
        minifierOptions: {
          conservativeCollapse: false,
          ignoreCustomFragments: [/<%.*%>/]
        }
      }
    });
  }
};