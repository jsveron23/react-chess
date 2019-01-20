const webpack = require('webpack')

module.exports = {
  plugins: {
    'postcss-import': { addDependencyTo: webpack },
    'postcss-preset-env': {
      features: {
        'nesting-rules': true,
        browsers: ['last 2 versions', '> 5%']
      }
    }
  }
}
