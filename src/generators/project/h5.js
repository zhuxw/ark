"use strict";

var path = require('path');
function wrap(p) {
  return __dirname + '/templates/' + p;
}
function h5(p){
  return 'project-h5/' + p;
}

module.exports = {
  updateProject: function(gen) {
    gen.fs.copy(
      gen.templatePath(h5('cfg')),
      gen.destinationPath('cfg')
    );

    gen.fs.copyTpl(
      gen.templatePath(h5('cfg/webpack/base.js')),
      gen.destinationPath('cfg/webpack/base.js'),
      gen.props
    );

    gen.fs.copyTpl(
      gen.templatePath(h5('cfg/webpack/alias.js')),
      gen.destinationPath('cfg/webpack/alias.js'),
      gen.props
    );
  },

  copyProject: function(gen) {

    try{

    var projectName = gen.props.name;

    gen.destinationRoot(path.join(gen.options.cwd, projectName));

    gen.fs.copy(
      gen.templatePath(wrap(h5('**/*'))),
      gen.destinationRoot()
    );

    gen.fs.copy(
      gen.templatePath(wrap(h5('_eslintrc.js'))),
      gen.destinationPath('.eslintrc.js')
    );
    gen.fs.copy(
      gen.templatePath(wrap(h5('_gitignore'))),
      gen.destinationPath('.gitignore')
    );
    gen.fs.copyTpl(
      gen.templatePath(wrap(h5('_arkrc.js'))),
      gen.destinationPath('.arkrc.js'),
      gen.props
    );
    gen.fs.copyTpl(
      gen.templatePath(wrap(h5('_yo-rc.json'))),
      gen.destinationPath('.yo-rc.json'),
      gen.props
    );

    gen.fs.delete(gen.destinationPath('_eslintrc.js'));
    gen.fs.delete(gen.destinationPath('_gitignore'));
    gen.fs.delete(gen.destinationPath('_arkrc.js'));
    gen.fs.delete(gen.destinationPath('_yo-rc.json'));

    gen.fs.copyTpl(
      gen.templatePath(wrap(h5('README.md'))),
      gen.destinationPath('README.md'),
      gen.props
    );

    gen.fs.copyTpl(
      gen.templatePath(wrap(h5('package.json'))),
      gen.destinationPath('package.json'),
      gen.props
    );

    gen.fs.copyTpl(
      gen.templatePath(wrap(h5('localcfg.json.bak'))),
      gen.destinationPath('localcfg.json.bak'),
      gen.props
    );

    gen.fs.copyTpl(
      gen.templatePath(wrap(h5('/cfg/webpack/base.js'))),
      gen.destinationPath('cfg/webpack/base.js'),
      gen.props
    );

    gen.fs.copyTpl(
      gen.templatePath(wrap(h5('cfg/webpack/alias.js'))),
      gen.destinationPath('cfg/webpack/alias.js'),
      gen.props
    );
    }catch(e){
      console.error(e);
    }

  }
};