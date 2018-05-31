"use strict";
var fs = require('fs');
var path = require('path');
var versionReg = /(\d{1,}\.\d{1,}\.\d{1,})/gi;

//获取当前分支
function getCurrentBranch(root) {
  //ref: refs/heads/daily/3.0.0
  //ref: refs/heads/master

  var headPath = path.join(root, '.git/HEAD');
  var branch = '';
  try {
    var gitHead = fs.readFileSync(headPath).toString();
    branch = gitHead.replace('ref: refs/heads/', '');
  } catch (e) {
    return '';
  }
  return branch;
}

function getVersion(root) {

  var version = '';

  //获取版本号
  version = getCurrentBranch(root) || '';
  if (!version) {
    console.log('请切换到相应的daily/0.0.x分支开发');
  } else {
    version = version.match(versionReg);
    version = version && version[0];
  }

  return version;
}

function nextVersion(root) {
  var version = getVersion(root);
  if (version) {
    var parts = version.split('.');
    parts[2] = parseInt(parts[2]) + 1;
    return parts.join('.');
  }
  return null;
}

module.exports = {
  get: getVersion,
  next: nextVersion
};