module.exports = {
    extends: 'airbnb',
    parser: 'babel-eslint',
    rules: {
      'no-console': 'off',
      'no-underscore-dangle': 'off'
    },
    globals: {
      window: false,
      document: false,
      chrome: false
  }
}
