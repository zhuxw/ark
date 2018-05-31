"use strict";

var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var openurl = require('openurl');
var inlineSource = require('gulp-inline-source');
var replace = require('gulp-replace');

var argv = require('../util/argv')();
var pages = require('../util/pages');
var getValidPort = require('../util/getValidPort');

var localConfigFile = path.join(__dirname, '../../localcfg.json.bak');
if (!fs.existsSync(localConfigFile)) {
  console.log('创建localcfg.json.bak文件，用于存储本地配置');

  fs.writeFileSync(localConfigFile, JSON.stringify({
    host: 'localhost'
  }, null, '    '), 'utf8');
}
var localConfig = JSON.parse(fs.readFileSync(localConfigFile, 'utf-8'));
var serveHost = argv.host || localConfig.host || 'localhost';
var allHost = '0.0.0.0';
var selectedPages = pages.get(!argv.all && argv.target);

gulp.task('webpack:build', function (done) {
  var wpConfig = require('../webpack.config');
  webpack(wpConfig, function (err, stats) {
    if (stats) {
      console.log("[webpack]", stats.toString());
    }

    selectedPages.forEach(function (pageName) {
      var htmlPage = 'build/' + pageName + '/index.html';
      var pipe = gulp.src(htmlPage);

      if (argv.inline) {
        console.log('[gulp-inline-source] Inline ' + htmlPage);
        pipe = pipe.pipe(replace(/\sinline-mode\s/g, ' inline '));
      }
      pipe.pipe(inlineSource({
        compress: false
      })).pipe(gulp.dest('build/' + pageName));
    });

    done(err);
  });
});

gulp.task('webpack:serve', function (done) {
  var pageNames = pages.get(argv.target);

  if (pageNames.length) {
    getValidPort(allHost, argv.port, function (port) {
      if (port) {
        argv.port = port;

        var wpConfig = require('../webpack.config');
        var server = new WebpackDevServer(webpack(wpConfig), {
          contentBase: './build',
          host: allHost,
          hot: true,
          disableHostCheck: true
        });

        server.listen(port, allHost, function (err) {
          if (err) {
            done(err);
            return;
          }
          console.log('[webpack-dev-server]', 'Server listening on ' + port);
          // Server listening

          pageNames.forEach(function (pageName) {
            var url = "http://" + serveHost + ":" + port + "/" + pageName + "/index.html";
            console.log("[webpack-dev-server]", url);
            openurl.open(url);
          });
        });
      } else {
        done(new Error("no available port"));
      }
    });
  }else{
    console.warn('请先添加页面');
    done();
  }
});