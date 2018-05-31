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

import App from './js/app';

App.init(document.getElementById('app'));
