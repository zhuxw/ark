'use strict';
var Generator = require('yeoman-generator');
var path = require('path');
var welcome = require('../../util/welcome');
var getArkRC = require('../../util/getArkRC');
var spawn = require('../../util/spawn');
var depModules = require('../../util/depModules');
var utils = require('../../util/utils');
var update = require('./update');
var h5Prj = require('./h5');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    // add options
    this.option('name', {
      type: String
    });
    this.option('arkInfo', {
      type: Object
    });
    this.option('config', {
      type: Object
    });
    this.option('cwd', {
      type: String
    });
    this.option('update', {
      type: Boolean
    });
  }

  prompting() {
    console.log(welcome);

    var _this = this;
    var dirName = this.options.name || path.basename(__dirname);

    function normAnswers(answers) {
      answers.arkInfo = _this.options.arkInfo;
      answers.host = answers.host || 'localhost';
      answers.deps = depModules.get({
        vue: answers.framework === 'vue',
        react: /react/.test(answers.framework),
        ut: answers.ut
      });
    }

    if (!utils.isEmptyObj(this.options.config)) {
      this.props = this.options.config;
      normAnswers(this.props);
      return;
    }

    if (this.options.update) {
      // 更新
      var arkrc = this._arkrc = getArkRC(this.options.cwd);
      if (arkrc) {
        console.log('当前项目所用的ark版本为：', arkrc.version);
        console.log('当前安装的ark版本为：', this.options.arkInfo.version);
        return this.prompt([{
          type: 'confirm',
          name: 'overwrite',
          message: '更新操作将覆盖所有ark生成的配置文件，本地修改将丢失，是否确定?',
          default: true
        }]).then((answers) => {
          this.props = answers;
          answers.name = dirName;
          answers.framework = arkrc.framework || 'vanilla';
          normAnswers(this.props);
        });

      } else {
        this.log("没有找到格式正确的.arkrc文件，请确认当前目录为ark生成的项目根目录");

        this.props = {
          arkInfo: this.options.arkInfo
        };
      }
    } else {
      // 新装
      return this.prompt([{
        type: 'input',
        name: 'name',
        message: '请输入项目名？',
        default: dirName
      }, {
        type: 'input',
        name: 'host',
        message: '请输入本地域名?（如local.xxx.taobao.net，之后可在local.config.bak文件中更改）',
        default: 'localhost',
        store: true
      }, {
        type: 'list',
        name: 'framework',
        message: '请选择框架',
        store: true,
        choices: [
          'vanilla',
          'vue',
          'react',
          'preact'
        ],
        default: 'vanilla'
      }, {
        type: 'confirm',
        name: 'ut',
        message: '是否建立单元测试框架？',
        default: false
      }, {
        type: 'confirm',
        name: 'install',
        message: '是否需要自动执行npm install？',
        default: true,
        store: true
      }]).then((answers) => {

        this.props = answers;
        normAnswers(this.props);

      });
    }
  }

  copyProject() {
    if (this.options.update) {
      if (this.props.overwrite) {
        this.conflicter.force = true;
        update(this);
      }
    } else {
      try {
        h5Prj.copyProject(this);
      } catch (e) {
        console.error(e);
      }
    }
  }

  install() {
    return new Promise((resolve, reject) => {
      if (!this.options.update) {
        this.log('正在初始化git仓库，创建master分支，并执行tnpm install安装依赖...');
        spawn.batch(this, [
          'git init',
          'git checkout -b master',
          'git add .',
          'git commit -m \'init\'',
          this.props.install && 'npm install'
        ], resolve);
      } else if (this.props.install) {
        this.log('正在执行npm install安装依赖，请耐心等待...');
        this.spawnCommand('npm', ['install']).on('close', resolve);
      } else {
        resolve();
      }
    });
  }

  end() {
    if (this.options.update) {
      var name = path.basename(this.destinationRoot());
      if (this.props.overwrite) {
        this.log('\n项目 ' + name + ' 更新完毕\n');
      } else {
        this.log('\n项目 ' + name + ' 放弃更新\n');
      }
    } else {
      this.log('\n项目 ' + this.props.name + ' 创建完毕\n');
      if (!this.props.install) {
        this.log('执行以下命令以安装依赖\n', 'cd ' + this.props.name + ' && npm install');
      }
    }
  }
};