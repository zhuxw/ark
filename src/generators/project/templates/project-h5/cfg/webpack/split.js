"use strict";
var webpack = require('webpack');

module.exports = {
  config: function (config, argv, rc) {
    var preCommon = rc && rc.preCommon || [];
    var postCommon = rc && rc.postCommon || [];
    var bundles = {};

    if (preCommon.length) {
      bundles["_common/pre-common"] = preCommon;
    }
    if (postCommon.length) {
      bundles["_common/post-common"] = postCommon;
    }

    var bundleNames = Object.keys(bundles);

    var cacheGroups = {
      default: false
    };
    bundleNames.forEach(function(bundleName){
      config.entry[bundleName] = bundles[bundleName];

      cacheGroups[bundleName] = {
        name: bundleName,
        minChunks: Infinity
      };
    });

    if(bundleNames.length){
      config.optimization = config.optimization || {};
      config.optimization.splitChunks = {
        cacheGroups: cacheGroups
      };
    }
  }
};