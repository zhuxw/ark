"use strict";

var h5Prj = require('./h5');

var wrap = function(p) {
  return __dirname + '/templates/' + p;
};

function updateCfgs(gen) {
  gen.log('正在更新配置文件');
  try {
    h5Prj.updateProject(gen);
  } catch (e) {
    console.error(e);
  }
}

function updatePackageJson(gen) {
  gen.log('正在更新package.json');
  try {
    var updated = false;
    var deps = gen.props.deps;
    var packageJsonDest = gen.fs.readJSON(gen.destinationPath('package.json'));

    gen.fs.copyTpl(
      gen.templatePath(wrap('project-h5/package.json')),
      gen.destinationPath('package.json.tmp'),
      gen.props
    );

    var destDeps = packageJsonDest.dependencies;
    var destDevDeps = packageJsonDest.devDependencies;

    if (deps) {
      destDevDeps = destDevDeps || {};
      destDeps = destDeps || {};
      Object.keys(deps).forEach(function(depName) {
        if (destDevDeps[depName] !== deps[depName] && destDeps[depName] !== deps[depName]) {
          updated = true;
          destDevDeps[depName] = deps[depName];
          if (deps.hasOwnProperty(depName)) {
            delete deps[depName];
          }
        }
      });
      packageJsonDest.devDependencies = destDevDeps;
      packageJsonDest.dependencies = destDeps;
    }

    if (updated) {
      gen.fs.writeJSON(gen.destinationPath('package.json'), packageJsonDest, null, '  ');
      gen.props.install = true;
    } else {
      gen.log('package.json已是最新，不需要tnpm install');
    }
  } catch (e) {
    console.error(e);
  }
}

function updateArkRc(gen) {
  try {
    var oldVersion = gen._arkrc.version;
    var newVersion = gen.options.arkInfo.version;

    if (oldVersion !== newVersion) {
      gen._arkrc.version = newVersion;
      gen.log('本项目的ark版本号从 ' + oldVersion + ' 变更为 ' + newVersion);
    } else {
      gen.log('本项目的ark版本号为 ' + oldVersion + ', 与所安装的ark版本号一致');
    }

    gen.fs.writeJSON(gen.destinationPath('.arkrc'), gen._arkrc, null, '  ');
  } catch (e) {
    console.error(e);
  }
}

function updateGitIgnore(gen) {
  gen.log('正在更新.gitignore');

  try {
    var templateRoot = 'project';
    var tpl = gen.fs.read(gen.templatePath(templateRoot + '/_gitignore'));
    var target = gen.fs.read(gen.destinationPath('.gitignore'));
    var tplLines = tpl.split(/\r\n|\n/);
    var targetLines = target.split(/\r\n|\n/);

    var targetDict = {};
    targetLines.forEach(function(line) {
      targetDict[line] = true;
    });

    tplLines.forEach(function(line) {
      if (!targetDict[line]) {
        targetLines.push(line);
      }
    });

    gen.fs.write(gen.destinationPath('.gitignore'), targetLines.join('\r\n'));
  } catch (e) {
    console.error(e);
  }
}


module.exports = function(gen) {
  updateArkRc(gen);
  updatePackageJson(gen);
  updateGitIgnore(gen);
  updateCfgs(gen);
};