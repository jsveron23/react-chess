const Loaders = require('./webpack/loaders')
const Plugins = require('./webpack/plugins')
const { distPath, srcPath, assetsPath, getAbsPath } = require('../lib/path')
const config = require('./')

/**
 * Create Webpack config with argument which passed from NPM script
 * @param  {Object} args
 * @param  {string} args.production
 * @return {Object}
 */
function configure ({ production } = {}) {
  const env = production ? 'production' : 'development'
  const isDev = env === 'development'
  const entry = {
    app: ['./index'],
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'prop-types',
      'classnames'
    ]
  }
  const module = {
    noParse: config.noParse
  }
  const resolve = {
    alias: {
      '@actions': getAbsPath('src/actions'),
      '@reducers': getAbsPath('src/reducers'),
      '@components': getAbsPath('src/components'),
      '@constants': getAbsPath('src/constants'),
      '@utils': getAbsPath('src/utils'),
      '@styles': getAbsPath('src/styles'),
      '@assets': getAbsPath('src/assets')
    }
  }

  if (env === 'development') {
    entry.app.unshift(
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${config.port}`,
      'webpack/hot/only-dev-server'
    )
    module.rules = [
      Object.assign({}, Loaders.get('eslint'), { enforce: 'pre' }),
      Object.assign({}, Loaders.get('javascript'), { use: ['react-hot-loader/webpack', 'babel-loader'] }),
      {
        test: /\.css$/,
        include: [srcPath],
        use: Loaders.get('style css postcss')
      }
    ]
  } else {
    module.rules = [
      Loaders.get('javascript'),
      {
        test: /\.css$/,
        include: srcPath,
        use: Plugins.extractCSS({
          fallback: Loaders.get('style'),
          use: Loaders.get('css postcss')
        })
      }
    ]
  }

  return {
    target: 'web',
    output: {
      path: distPath,
      filename: '[name].js',
      publicPath: '/'
    },
    plugins: Plugins.get(env),
    context: srcPath,
    devtool: isDev ? 'cheap-module-source-map' : 'nosources-source-map',
    devServer: isDev ? Object.assign({}, config.devServer, {
      contentBase: assetsPath
    }) : undefined,
    resolve,
    entry,
    module
  }
}

module.exports = configure
