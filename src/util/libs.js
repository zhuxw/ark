'use strict';

// CDN固定使用jsdeivr：https://www.jsdelivr.com/

var libs = {
  'vue': {
    visible: false,
    target: [
      'npm/vue@2.5.16/dist/vue.runtime.min.js'
    ]
  },
  'react': {
    visible: false,
    target: [
      'npm/react@16.4.0/umd/react.production.min.js',
      'npm/react-dom@16.4.0/umd/react-dom.production.min.js',
    ]
  },
  'preact': {
    visible: false,
    target: [
      'npm/preact@8.2.9/dist/preact.min.js'
    ]
  },
};

function getLibChoices(ligorc) {
  var choices = [];

  var frameworkLibs = libs[ligorc.framework];
  if (frameworkLibs) {
    frameworkLibs.always = true;
  }

  for (var key in libs) {
    if (libs.hasOwnProperty(key) && libs[key].visible !== false) {
      var checked = libs[key].included || libs[key].always;

      choices.push({
        name: libs[key].name || key,
        value: key,
        checked: checked
      });
    }
  }
  return choices;
}

function normLibChoices(choices, gen) {
  var dict = {};
  var i, j;
  var key;
  var item;
  var deps;
  var sorted = [];
  // 填上依赖库
  for (i = 0; i < choices.length; ++i) {
    key = choices[i];
    item = libs[key];
    dict[key] = cloneLibItem(item);
    deps = item.deps || [];
    for (j = 0; j < deps.length; ++j) {
      dict[deps[j]] = cloneLibItem(libs[deps[j]]);
      gen.log(key + '依赖于' + deps[j]);
    }
  }
  // 填上永远包含的库
  for (key in libs) {
    if (libs.hasOwnProperty(key) && libs[key].always) {
      dict[key] = cloneLibItem(libs[key]);
    }
  }
  topoSort(dict, sorted);
  gen.log('最终使用的库：' + sorted.join(', '));
  return sorted;
}

function cloneLibItem(item) {
  return {
    deps: item.deps && item.deps.slice(),
    target: item.target
  };
}

// 对使用到的库做拓扑排序
function topoSort(dict, sorted) {
  var key;
  var item;
  var picked = {};
  var hasPicked = false;
  for (key in dict) {
    if (dict.hasOwnProperty(key) && dict[key]) {
      item = dict[key];
      if (!item.deps || !item.deps.length) {
        hasPicked = true;
        picked[key] = true;
        sorted.push(key);
        dict[key] = null;
      }
    }
  }
  for (key in dict) {
    if (dict.hasOwnProperty(key) && dict[key]) {
      item = dict[key];
      if (item.deps) {
        for (var i = item.deps.length; i--;) {
          if (picked[item.deps[i]]) {
            item.deps.splice(i, 1);
          }
        }
      }
    }
  }
  if (hasPicked) {
    topoSort(dict, sorted);
  }
}

function getLibsCdn(choices) {
  var cdns = [];
  for (var i = 0; i < choices.length; ++i) {
    var item = libs[choices[i]];
    if (item.target) {
      for (var j = 0; j < item.target.length; ++j) {
        if (item.target[j]) {
          cdns.push(item.target[j]);
        }
      }
    }
  }
  return 'https://cdn.jsdelivr.net/' + cdns.join(',');
}

module.exports = {
  getLibChoices: getLibChoices,
  normLibChoices: normLibChoices,
  getLibsCdn: getLibsCdn
};