module.exports = {
  extends: "react-app",
  rules: {
    'no-var': 2,
    'no-console': [1, { allow: ['warn', 'error', "info"] }],
    'no-debugger': 2,
    'no-empty': [2],
    'no-extra-boolean-cast': 2,
    'no-extra-semi': 1,
    'no-inner-declarations': [2, 'functions'],
    'no-undef': 2,
    'no-unneeded-ternary': 1,
    'no-unsafe-negation': 2,
    'no-unused-vars': [1, { ignoreRestSiblings: true }],
    'import/no-unresolved': 2,
    'import/named': 2,
    'no-const-assign': 2,
    'import/default': 2,
    'react/jsx-boolean-value': 0,
    'react/jsx-key': 2
  }
}
