"use strict";

var fs = require('fs');
var path = require('path');

function getAllPages() {
  var dirName = path.join(__dirname, '../../src');
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

function getPages(selectedPages) {
  var allPages = getAllPages();

  if (selectedPages) {
    // Normalize input target names
    var inputTarget = selectedPages || [];
    var targets = typeof inputTarget === "string" ? inputTarget.split(',') : inputTarget;
    targets = targets.map(function(pageName) {
      return pageName.trim();
    }).filter(function(pageName) {
      return pageName;
    }).map(function(pageName) {
      return path.basename(pageName);
    });

    targets = targets.filter(function(pageName) {
      return allPages.indexOf(pageName) >= 0;
    });
    if (!targets.length) {
      targets = allPages;
    }
    return targets;
  }
  return allPages;
}

module.exports = {
  get: getPages
};