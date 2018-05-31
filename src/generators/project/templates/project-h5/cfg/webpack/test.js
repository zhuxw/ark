'use strict';

module.exports = {
  config: function (config, argv) {
    config.entry = './cfg/tests.bundle.js';

    config.module.rules.some(function (item) {
      if (item.loader === 'vue-loader') {
        item.options.loaders.js.unshift({
          loader: 'istanbul-instrumenter-loader'
        });
        return true;
      }
    });
  }
};