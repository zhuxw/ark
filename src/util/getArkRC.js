'use strict';

var fs = require('fs');
var path = require('path');

// arkrc格式向后兼容
var normArkRC = function(arkrc) {
  arkrc.framework = arkrc.framework || 'vanilla';
  if (arkrc.config) {
    var cfg = arkrc.config;
    if (cfg.react) {
      arkrc.framework = 'react';
    }
    if (cfg.preact) {
      arkrc.framework = 'preact';
    }
    if (cfg.vue) {
      arkrc.framework = 'vue';
    }
  }
};

function getArkRC() {
  var arkrc = null;
  var arkrcPath = path.join(process.cwd(), '.arkrc.js');
  try{
    arkrc = require(arkrcPath);
    normArkRC(arkrc);
  }catch(e){
  }

  return arkrc || {};
};

module.exports = getArkRC;