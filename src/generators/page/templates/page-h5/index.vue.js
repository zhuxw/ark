if (process.env.DEBUG) {
  require('./index.html')({
    htmlWebpackPlugin: {
      options: {
        buildOptions: {
          debug: process.env.DEBUG,
          resourceBase: process.env.RESOURCE_BASE,
          local: process.env.LOCAL
        }
      }
    }
  });
}
require('./index.scss');

import Vue from 'vue';
import App from './js/app.vue';

const AppConstroctor = Vue.extend(App);
new AppConstroctor().$mount('#app');