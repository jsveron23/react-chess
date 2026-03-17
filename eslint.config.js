import globals from 'globals';
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import checkFilePlugin from 'eslint-plugin-check-file';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import reactPlugin from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  jsdocPlugin.configs['flat/recommended-error'],
  {
    name: 'Default ESLint configuration object',
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.bunBuiltin,
        ...globals.browser,
        __dirname: true,
      },
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['~', './src'],
            ['chess/es', './packages/chess/src'],
            ['ui/es', './packages/ui/src'],
          ],
        },
      },
      jsdoc: {
        mode: 'jsdoc',
        tagNamePreference: {
          returns: 'return',
        },
      },
      react: {
        version: 'detect',
      },
    },
    plugins: {
      import: importPlugin,
      'check-file': checkFilePlugin,
      jsdoc: jsdocPlugin,
      react: reactPlugin,
    },
  },
  {
    name: 'Default rules object',
    files: ['**/*.js'],
    rules: {
      'no-unused-vars': 'error',
      'no-underscore-dangle': 'off',
      'no-console': ['error', { allow: ['error', 'warn'] }],
      'arrow-body-style': 'off',
      'import/no-unresolved': [
        'error',
        { caseSensitive: false, ignore: ['hono', 'bun'] },
      ],
      'import/named': 'off',
      'import/no-extraneous-dependencies': 'error',
    },
  },
  {
    name: 'Required rules object',
    files: ['**/*.js'],
    rules: {
      'no-var': 'error',
      'no-return-await': 'error',
      'no-invalid-this': 'error',
      'new-cap': ['error', { newIsCap: true, capIsNew: false }],
      'object-shorthand': ['error', 'always'],
      camelcase: [
        'error',
        {
          properties: 'always',
          allow: [
            '^([A-Z][a-z0-9]*(_[A-Z][a-z0-9]*)*)$',
            '^([A-Z/]+(_[A-Z/a-z0-9]*)*)$',
          ],
          ignoreDestructuring: true,
        },
      ],
      'import/no-commonjs': 'error',
      'import/no-default-export': 'error',
      'import/prefer-default-export': 'off',
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.js': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
    },
  },
  {
    name: 'Conditional rules object',
    files: ['**/*.js'],
    rules: {
      'import/order': [
        'warn',
        {
          groups: [
            ['external', 'builtin'],
            'internal',
            'index',
            'sibling',
            'parent',
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
        },
      ],
      'no-param-reassign': [
        'warn',
        { props: true, ignorePropertyModificationsFor: ['c', 'acc'] },
      ],
    },
  },
  {
    name: 'Readability rules object',
    files: ['**/*.js'],
    rules: {
      'jsdoc/require-param': 'warn',
      'jsdoc/check-param-names': 'warn',
      'jsdoc/require-description': 'warn',
      'jsdoc/require-property-description': 'off',
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/require-hyphen-before-param-description': 'off',
      'jsdoc/valid-types': 'off',
      'jsdoc/check-types': 'off',
      'jsdoc/no-defaults': 'off',
      'jsdoc/no-types': 'off',
      'jsdoc/require-param-type': 'off',
      'jsdoc/require-returns-type': 'off',
      'jsdoc/no-undefined-types': 'off',
      'jsdoc/reject-function-type': 'off',
      'jsdoc/require-returns-check': 'off',
      'jsdoc/check-tag-names': 'off',
      'jsdoc/reject-any-type': 'off',
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: false,
            ArrowFunctionExpression: false,
            FunctionExpression: false,
          },
          checkConstructors: false,
        },
      ],
      'newline-before-return': 'warn',
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: '*', next: 'return' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
      ],
    },
  },
  {
    name: 'Ignore rules object [eslint.config.js]',
    files: ['eslint.config.js'],
    rules: {
      'import/order': 'off',
      'import/no-default-export': 'off',
    },
  },
  {
    name: 'Ignore rules object [src/index.js]',
    files: ['src/index.js'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    name: 'Ignore rules object [scripts/]',
    files: ['scripts/**'],
    rules: {
      'no-return-await': 'off',
      'no-console': 'off',
      'padding-line-between-statements': 'off',
      'import/no-default-export': 'off',
      'import/no-unresolved': 'off',
      'jsdoc/require-jsdoc': 'off',
    },
  },
  {
    name: 'Ignore rules object [scripts/]',
    files: ['**/*.spec.js'],
    rules: {
      'jsdoc/require-jsdoc': 'off',
    },
  },
  {
    name: 'React rules object',
    files: ['**/*.js'],
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
