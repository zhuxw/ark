"use strict";
var fs = require('fs');
var path = require('path');
var versionReg = /(\d{1,}\.\d{1,}\.\d{1,})/gi;

//获取当前分支
function getCurrentBranch() {
  //ref: refs/heads/daily/3.0.0
  //ref: refs/heads/master
  var branch = '';
  try {
    var gitHead = fs.readFileSync(path.join(__dirname, '../../.git/HEAD')).toString();
    branch = gitHead.replace('ref: refs/heads/', '');
  } catch (e) {
    return '';
  }
  return branch;
}

function getVersion() {
  var version = '';

  //获取版本号
  version = getCurrentBranch() || '';
  if (!version) {
    console.warn('无法从当前分支名称中获取版本号');
  } else {
    version = version.match(versionReg);
    version = version && version[0];
  }

  return version;
}

module.exports = {
    get: getVersion
};
