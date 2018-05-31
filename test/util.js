'use strict';

var path = require('path');
var cmd = require('../src/cmd');
var spawnUtil = require('../src/util/spawn');
var TEMP_PRJ_ROOT = path.join(__dirname, '../temp');

function ligo(cmdStr, options, cwd, done){
    var optionsStr = JSON.stringify(options);
    cmd('node ligo ' + cmdStr + 
        ' --config ' + optionsStr +
        ' --cwd ' + cwd, done);
}

function ligoInit(options, done){
    options.name = 'temp';
    ligo('init', options, path.join(__dirname, '..'), done);
}

function ligoPage(options, done){
    ligo('page', options, TEMP_PRJ_ROOT, done);
}

function ligoComp(options, done){
    ligo('comp', options, TEMP_PRJ_ROOT, done);
}

function ligoInstall(restCmd, options, done){
    if(typeof restCmd !== 'string'){
        done = options;
        options = restCmd;
    }
    ligo('install ' + restCmd, options, TEMP_PRJ_ROOT, done);
}

function ligoMock(restCmd, options, done){
    if(typeof restCmd !== 'string'){
        done = options;
        options = restCmd;
    }
    ligo('mock ' + restCmd, options, TEMP_PRJ_ROOT, done);
}

function ligoVenus(options, done){
    ligo('venus', options, TEMP_PRJ_ROOT, done);
}

function spawn(cmdStr, done){
    spawnUtil.exec(null, cmdStr, {
        cwd: path.resolve(__dirname, '..')
    }, done);
}


module.exports = {
    ligoInit: ligoInit,
    ligoPage: ligoPage,
    ligoComp: ligoComp,
    ligoInstall: ligoInstall,
    ligoMock: ligoMock,
    ligoVenus: ligoVenus,

    spawn: spawn,
    TEMP_PRJ_ROOT: TEMP_PRJ_ROOT
};