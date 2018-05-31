'use strict';

var MODS_BASIC = {
  "autoprefixer": "7.2.5",
  "chalk": "2.3.0",
  "del": "3.0.0",
  "eslint": "4.19.1",
  'eslint-plugin-babel': '5.1.0',
  'eslint-plugin-react': '7.8.2',
  'eslint-plugin-vue': '4.5.0',
  "gulp": "3.9.1",
  "gulp-connect": "5.2.0",
  "gulp-eslint": "4.0.2",
  "gulp-insert": "0.5.0",
  "gulp-inline-source": "3.1.0",
  "gulp-replace": "0.5.4",
  "gulp-sequence": "1.0.0",
  "gulp-autoprefixer": "4.1.0",
  "gulp-rename": "1.2.2",
  "gulp-cssmin": "0.2.0",
  "minimist": "1.2.0",
  "openurl": "1.1.1",

  "webpack": "4.10.2",
  "webpack-cli": "2.1.4",
  "progress-bar-webpack-plugin": "1.11.0"
};

var MODS_WEBPACK_H5 = {
  "copy-webpack-plugin": "4.5.1",
  "extract-text-webpack-plugin": "4.0.0-beta.0",
  "html-webpack-plugin": "3.2.0",
  "css-loader": "0.28.11",
  "svg-url-loader": "2.3.1",
  "svgo": "1.0.4",
  "svgo-loader": "2.1.0",
  "postcss-loader": "2.1.0",
  "sass-loader": "7.0.1",
  "style-loader": "0.21.0",
  "underscore-loader": "3.0.0",
  "url-loader": "1.0.1",
  "ejs-loader": "0.3.1",
  "node-sass": "4.9.0",
  "webpack-dev-server": "3.1.4"
};


var MODS_BABLE = {
  'babel-eslint': '8.2.3',
  "babel-core": "6.26.3",
  "babel-loader": "7.1.4",
  "babel-plugin-transform-remove-strict-mode": "0.0.2",
  "babel-preset-env": "1.7.0"
};

var MODS_TEST = {
  'babel-plugin-istanbul': '4.1.6',
  'chai': '4.1.2',
  'chai-spies': '1.0.0',
  'enzyme': '^3.3.0',
  'istanbul-instrumenter-loader': '3.0.1',
  'mocha': '5.2.0',
  'karma': '2.0.2',
  'karma-chai-plugins': '0.9.0',
  'karma-chrome-launcher': '2.2.0',
  'karma-coverage': '1.1.2',
  'karma-mocha': '1.3.0',
  'karma-mocha-reporter': '2.2.5',
  'karma-sourcemap-loader': '0.3.7',
  'karma-webpack': '3.0.0',
};

var MODS_VUE = {
  // vue-loader依赖@vue/component-compiler-utils依赖prettier，最新的prettier1.13.0会报错
  "prettier": "1.12.1", 
  "vue": "2.5.16",
  "vue-style-loader": "4.1.0",
  "vue-loader": "15.2.1",
  "vue-template-compiler": "2.5.16",
};

var MODS_REACT = {
  "babel-preset-react": "6.23.0",
  "react": "15.4.2",
  "react-dom": "15.4.2",
  "react-lite": "0.15.32",
  "react-addons-test-utils": "15.4.2"
};

var MODS_PREACT = {
  "babel-preset-react": "6.23.0",
  "preact": "8.2.7"
};

module.exports = {
  get: function(options) {
    var deps = Object.assign({},
      MODS_BASIC,
      MODS_BABLE,
      MODS_WEBPACK_H5,
      options.vue && MODS_VUE,
      options.react && MODS_REACT,
      options.preact && MODS_PREACT,
      options.ut && MODS_TEST
    );

    var ret = {};
    Object.keys(deps).sort().forEach(function(key){
      ret[key] = deps[key];
    });

    return ret;
  }
};