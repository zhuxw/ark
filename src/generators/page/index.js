'use strict';
var Generator = require('yeoman-generator');
var getArkRC = require('../../util/getArkRC');
var h5Page = require('./h5');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    // add options
    this.option('name', {
      type: String
    });
    this.option('pageTitle', {
      type: String
    });
    this.option('config', {
      type: Object
    });
    this.option('cwd', {
      type: String
    });
    this.option('fix', {
      type: Boolean
    });
  }

  prompting() {
    var dirName = this.options.name || 'sample-page';
    var arkrc = this._arkrc = getArkRC(this.options.cwd);
    if (!arkrc) {
      this.log("没有找到格式正确的.arkrc文件，请确认当前目录为ark生成的项目根目录");
      return;
    }

    var pageType = '页面';
    this._pageType = pageType;
    console.log('*** Ark准备为您创建' + pageType + ' ***');

    this._lang = 'javascript';

    try {
      return h5Page.prompting(this, arkrc, dirName);
    } catch (e) {
      console.log(e);
    }
  }

  copyPage() {
    try {
      if (this._arkrc) {
        return h5Page.copyFiles(this);
      }
    } catch (e) {
      console.error(e);
    }
  }

  end() {
    if (this._arkrc) {
      this.log('\n' + this._pageType + ' ' + this.props.name + ' 创建完毕\n');
    } else {
      this.log('放弃创建' + this._pageType);
    }
  }
};