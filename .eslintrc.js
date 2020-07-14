module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'rules': {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'import/prefer-default-export': 0,
    'react/destructuring-assignment': 0,
    'global-require': 0,
    'max-len': [2, 150, 4, {"ignoreUrls": true}],
    'react/forbid-prop-types': 0,
    'camelcase': 0,
    'no-nested-ternary': 0,
    'prefer-spread': 0,
    'react/no-string-refs': 0,
    'no-underscore-dangle': 0,
    'react/jsx-no-bind': 0
  },
  'globals': {
    "fetch": false
  }
}