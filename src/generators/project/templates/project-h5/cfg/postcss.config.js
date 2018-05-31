var autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({
      remove: false,
      browsers: [
        'ios >= 7',
        'Android >= 4'
      ]
    })
  ]
};