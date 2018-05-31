'use strict';
var path = require('path');
var libs = require('../../util/libs');
var utils = require('../../util/utils');

function prompting(gen, arkrc, dirName) {
  var normAnswers = function (answers) {
    answers.arkInfo = arkrc;
    answers.libs = libs.normLibChoices(answers.libs || [], gen);
    answers.libsCdn = libs.getLibsCdn(answers.libs || []);
    return answers;
  };

  if (!utils.isEmptyObj(gen.options.config)) {
    gen.props = normAnswers(gen.options.config);
    return;
  }

  var libChoices = libs.getLibChoices(arkrc);

  var prompts = [{
    type: 'input',
    name: 'name',
    message: '请输入页面名',
    default: dirName
  }, {
    type: 'input',
    name: 'pageTitle',
    message: '请输入页面标题',
    default: function (answers) {
      return answers.name;
    }
  }, {
    type: 'checkbox',
    name: 'libs',
    message: '请选择需要使用的库',
    choices: libChoices,
    store: true,
    when: function () {
      return libChoices.length > 0;
    }
  }];

  return gen.prompt(prompts).then(function (answers) {
    gen.props = normAnswers(answers);
  });
}

function copyFiles(gen) {
  return new Promise(function (resolve) {

    gen.destinationRoot(path.join(gen.options.cwd, 'src', gen.props.name));

    gen.fs.copy(
      gen.templatePath('page-h5'),
      gen.destinationRoot()
    );

    gen.fs.copyTpl(
      gen.templatePath('page-h5/index.html'),
      gen.destinationPath('index.html'),
      gen.props
    );

    gen.fs.copyTpl(
      gen.templatePath('page-h5/index.js'),
      gen.destinationPath('index.js'),
      gen.props
    );

    gen.fs.delete(gen.destinationPath('js/app.vanilla.js'));
    gen.fs.delete(gen.destinationPath('js/app.react.js'));
    gen.fs.delete(gen.destinationPath('js/app.preact.js'));
    gen.fs.delete(gen.destinationPath('js/app.vue'));
    gen.fs.delete(gen.destinationPath('index.vue.js'));
    gen.fs.delete(gen.destinationPath('test/app.spec.vanilla.js'));
    gen.fs.delete(gen.destinationPath('test/app.spec.react.js'));
    gen.fs.delete(gen.destinationPath('test/app.spec.vue.js'));

    var framework = gen.props.arkInfo.framework;

    if (framework === 'react') {
      gen.fs.copyTpl(
        gen.templatePath('page-h5/js/app.react.js'),
        gen.destinationPath('js/app.js'),
        gen.props
      );

      gen.fs.copyTpl(
        gen.templatePath('page-h5/test/app.spec.react.js'),
        gen.destinationPath('test/app.spec.js'),
        gen.props
      );

      gen.fs.delete(gen.destinationPath('template/app.ejs'));
    } else if (framework === 'preact') {
      gen.fs.copyTpl(
        gen.templatePath('page-h5/js/app.preact.js'),
        gen.destinationPath('js/app.js'),
        gen.props
      );

      gen.fs.delete(gen.destinationPath('template/app.ejs'));

      gen.fs.copyTpl(
        gen.templatePath('page-h5/test/app.spec.react.js'),
        gen.destinationPath('test/app.spec.js'),
        gen.props
      );

    } else if (framework === 'vue') {
      gen.fs.copyTpl(
        gen.templatePath('page-h5/js/app.vue'),
        gen.destinationPath('js/app.vue'),
        gen.props
      );
      gen.fs.copyTpl(
        gen.templatePath('page-h5/index.vue.js'),
        gen.destinationPath('index.js'),
        gen.props
      );
      gen.fs.delete(gen.destinationPath('template/app.ejs'));

      gen.fs.copyTpl(
        gen.templatePath('page-h5/test/app.spec.vue.js'),
        gen.destinationPath('test/app.spec.js'),
        gen.props
      );

    } else {
      gen.fs.copyTpl(
        gen.templatePath('page-h5/js/app.vanilla.js'),
        gen.destinationPath('js/app.js'),
        gen.props
      );
      gen.fs.copyTpl(
        gen.templatePath('page-h5/test/app.spec.vanilla.js'),
        gen.destinationPath('test/app.spec.js'),
        gen.props
      );
    }

    resolve();
  });
}

module.exports = {
  prompting: prompting,
  copyFiles: copyFiles
};