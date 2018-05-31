/* eslint-env mocha */
/* global chai */
var Vue = require('vue');
var App = require('../js/app').default;
var assert = chai.assert;

// 单元测试示例
describe('app', function() {
  it('text is correct', function(){
    var AppConstroctor = Vue.extend(App);
    var app = new AppConstroctor().$mount();

    assert.equal(app.$el.textContent, 'Hello, World!');
  });
});
