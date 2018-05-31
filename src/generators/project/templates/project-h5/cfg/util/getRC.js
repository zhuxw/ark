'use strict';

module.exports = function() {
  var rc = null;
  try{
    rc = require('../../.arkrc');
  }catch(e){
  }

  return rc || {};
};
