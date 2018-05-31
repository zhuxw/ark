"use strict";

module.exports = {
  config: function (config, argv, rc) {
    config.module.rules.push({
      test: /\.(jpg|png|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: rc.inlineImgSizeLimit == null ? 10240 : rc.inlineImgSizeLimit,
          name: '[name]-[hash].[ext]'
        }
      }]
    }, {
      test: /\.svg$/,
      use: [{
        loader: 'svg-url-loader',
      }, {
        loader: 'svgo-loader'
      }]
    });
  }
};