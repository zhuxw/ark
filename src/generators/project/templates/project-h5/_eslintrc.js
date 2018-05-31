module.exports = {
  "root": true, // 保证其他文件夹的eslint设置不影响本项目
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true
  },
  "globals": {
    "orbit": true,
    "Promise": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:vue/recommended"
  ],
  "plugins": [
    "babel",
    "react",
    "vue"
  ],
  "rules": {
    "strict": "off",
    "eqeqeq": ["error", "always", {"null": "ignore"}],
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-unused-vars": ["error", { "args": "after-used" }],

    // react
    "react/react-in-jsx-scope": "off",

    // vue
    "vue/require-prop-types": "off",
    "vue/attributes-order": ["warn", {
      order: [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'GLOBAL',
        'UNIQUE',
        'OTHER_ATTR',
        'BINDING',
        'EVENTS',
        'CONTENT'
      ]
    }]
  }
};
