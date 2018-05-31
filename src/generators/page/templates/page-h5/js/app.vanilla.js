/*
 * app
 */

var tpl = require('../template/app.ejs');

var app = {
  init: function(node) {
    node.innerHTML = tpl({
      name: 'Hello, World!'
    });
  }
};

module.exports = app;
