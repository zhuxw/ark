var chalk = require('chalk');
var child_process = require('child_process');
var dummy = function() {};

function isArray(it) {
  return Object.prototype.toString.apply(it) === '[object Array]';
}

function joinString(args) {
  var ret = [];
  var current = '';
  var level = 0;
  var RE_START = /^'/;
  var RE_END = /'$/;

  for (var i = 0; i < args.length; ++i) {
    var arg = args[i];
    if (!level && RE_START.test(arg)) {
      level++;
    }
    if (level) {
      current += arg;

      if (RE_END.test(arg)) {
        level--;
        arg = current;
        current = '';
      }
    }
    if (!level) {
      ret.push(arg);
    }
  }
  return ret;
}

function spawn(gen, cmd, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  var parts = cmd.split(/\s+/);
  var cmdName = parts[0];
  var args = parts.slice(1);
  args = joinString(args);
  var child = gen ? gen.spawnCommand(cmdName, args, options) :
    child_process.spawn(cmdName, args, options);
  if (!gen && !options.hideOutput) {
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  }
  child.on('close', callback || dummy);
  return child;
}

function batch(gen, cmds, options, done) {
  if (typeof options === 'function') {
    done = options;
    options = {};
  }
  var execOne = function(idx) {
    var cmd = cmds[idx];
    var ignoreErr = false;
    if (isArray(cmd)) {
      ignoreErr = cmd.indexOf('ignore-err') > 0;
      cmd = cmd[0];
    }
    if (cmd) {
      console.log(chalk.cyan('>> ' + cmd));
      spawn(gen, cmd, options, function(err) {
        if (err && !ignoreErr) {
          done(err);
        } else {
          execOne(idx + 1);
        }
      });
    } else if (idx < cmds.length - 1) {
      execOne(idx + 1);
    } else {
      done();
    }
  };

  execOne(0);
}

module.exports = {
  exec: spawn,
  batch: batch
};