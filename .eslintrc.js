module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    // 'plugin:node/recommended',
    'plugin:react/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      globalReturn: false,
    },
    ecmaVersion: 13,
    sourceType: 'module',
    allowImportExportEverywhere: false,
    babelOptions: {
      configFile: './babel.config.js',
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      webpack: {
        config: `${__dirname}/webpack.config.js`,
      },
    },
  },
  plugins: ['node', 'react', 'react-hooks'],
  rules: {
    'arrow-body-style': 0,
    'no-underscore-dangle': 0,
    'node/no-missing-require': 'error',
    'import/prefer-default-export': 0,
    'import/named': 0,
    'import/no-extraneous-dependencies': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
