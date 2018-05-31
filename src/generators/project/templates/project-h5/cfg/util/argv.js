"use strict";

module.exports = function() {
  return require('minimist')(process.argv.slice(2), {
    string: [
      'host',
      'port',
      'env',
      'target'
    ],
    boolean: [
      'release',
      'inline',
      'mock',
      'all',
      'local',
      'force'
    ],
    alias: {
      r: 'release',
      h: 'host',
      p: 'port',
      e: 'env',
      a: 'all',
      t: 'target',
      i: 'inline',
      m: 'mock',
      l: 'local',
      f: 'force'
    },
    default: {
      port: 8001,
      env: 'local'
    }
  });
};