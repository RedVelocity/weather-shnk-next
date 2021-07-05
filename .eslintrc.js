module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react'],
  rules: {
    'consistent-return': 1,
    'import/no-extraneous-dependencies': 0,
    'linebreak-style': 0,
    'no-return-assign': [1, 'except-parens'],
    'no-unused-expressions': [
      1,
      { allowTernary: true, allowShortCircuit: true },
    ],
    'react/prop-types': 1,
    'react/jsx-filename-extension': 1,
    'react/jsx-props-no-spreading': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-array-index-key': 0,
  },
};
