const webpack = require('webpack')

module.exports = {
  plugins: {
    'postcss-import': { addDependencyTo: webpack },
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 5%']
    }
  }
}
