/* eslint-env mocha */
/* global chai */
var app = require('../js/app');
var assert = chai.assert;

// 单元测试示例
describe('app', function() {
  it('text is correct', function(){
    var node = document.createElement('div');
    document.body.appendChild(node);
    app.init(node);
    assert.equal(node.textContent, 'Hello, World!');
  });
});
