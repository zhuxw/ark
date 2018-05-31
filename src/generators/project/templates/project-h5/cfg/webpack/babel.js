"use strict";

var path = require('path');
var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json')));

module.exports = {
  config: function (config, argv, rc) {
    var presets = ['env'];
    var plugins = ['transform-remove-strict-mode'];

    if (/react/.test(rc.framework)) {
      presets.push('react');
    }

    if (rc.framework === 'preact') {
      plugins.push(["transform-react-jsx", {
        "pragma": "preact.h"
      }]);
    }

    var env = {};
    if (pkg.devDependencies['babel-plugin-istanbul']) {
      env.test = {
        plugins: [
          ['istanbul', {
            exclude: [
              "src/**/test/**/*.js",
              "cfg/**/*.js"
            ]
          }]
        ]
      };
    }

    config.module.rules.push({
      test: /\.jsx?$/,
      // exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      options: {
        presets: presets,
        plugins: plugins,
        env: env
      }
    });
  }
};