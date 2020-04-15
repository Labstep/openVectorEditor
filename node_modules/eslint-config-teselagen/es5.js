module.exports = {
    "env": {
      "node": true,
      "browser": true,
      "mocha": true
    },
    "parser": "babel-eslint",
    "rules": {
      "no-undef": 2,
      'no-console': [1, { allow: ['warn', 'error', "info"] }],
      "no-unused-vars": 1,
      "no-redeclare": 2,
      "comma-dangle": 0,
      "no-mixed-spaces-and-tabs": 0,
      "indent": [0, "tab"],
      "quotes": [0, "double"],
      "linebreak-style": [0, "unix"],
      "semi": [0, "always"],
      "no-var": 2,
      "no-debugger": 2,
      "no-empty": [2],
      "no-extra-boolean-cast": 2,
      "no-extra-semi": 1,
      "no-inner-declarations": [2, "functions"],
      "no-unneeded-ternary": 1,
      "no-unsafe-negation": 2,
      "import/no-unresolved": 2,
      "import/named": 2,
      "import/default": 2,
      "object-shorthand": 0,
      "no-else-return": 0,
      "react/jsx-no-bind": 1,
      "react/jsx-boolean-value": 0,
      "react/jsx-key": 2,
      "jsx-a11y/href-no-hash": 0
    }
  
  };