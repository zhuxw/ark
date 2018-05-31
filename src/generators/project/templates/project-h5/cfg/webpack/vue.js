"use strict";
var VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;

module.exports = {
  config: function (config, argv, rc) {
    if (rc.framework === 'vue') {
      config.module.rules.push({
        test: /\.vue$/,
        loader: 'vue-loader'
      });

      config.plugins.push(new VueLoaderPlugin());
    }
  }
};