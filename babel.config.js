module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          chrome: '70',
          ie: '11'
        }
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    'react-hot-loader/babel',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-react-jsx-source',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              chrome: '70',
              ie: '11'
            }
          }
        ]
      ]
    }
  }
}
