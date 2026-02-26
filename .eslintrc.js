module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  plugins: ['react', 'react-native', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react-native/no-inline-styles': 'warn',
  },
};
