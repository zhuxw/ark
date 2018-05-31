'use strict';

var path = require('path');
var fs = require('fs');

function getAllPages(cwd) {
  cwd = cwd || process.cwd();
  var dirName = path.join(cwd, 'src');
  var files = fs.readdirSync(dirName);
  var targets = [];

  for (var i = 0, len = files.length; i < len; i++) {
    var pageName = files[i];
    if (pageName.charAt(0) !== '_' && pageName.charAt(0) !== '.') {
      var pagePath = path.join(dirName, pageName);
      var stats = fs.statSync(pagePath);
      if (stats.isDirectory()) {
        targets.push(pageName);
      }
    }
  }
  return targets;
}


module.exports = getAllPages;