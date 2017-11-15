const Loaders = require('./webpack/loaders')
const Plugins = require('./webpack/plugins')
const { pubPath, srcPath, assetsPath } = require('./libs/path')
const config = require('./config')

/**
 * Create Webpack config with argument which passed from NPM script
 * @param  {Object} args
 * @param  {string} args.production
 * @return {Object}
 */
function configure ({ production } = {}) {
  const nodeEnv = production ? 'production' : 'development'
  const isDev = nodeEnv === 'development'
  const entry = {
    app: ['./index'],
    vendor: [
      'react',
      'react-dom',
      'prop-types',
      'classnames'
    ]
  }
  const module = {
    noParse: config.noParse
  }
  const resolve = {
    alias: {
      '@components': `${srcPath}/components`,
      '@utils': `${srcPath}/utils`,
      '@styles': `${srcPath}/styles`,
      '@assets': `${srcPath}/assets`
    }
  }

  if (nodeEnv === 'development') {
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
      path: pubPath,
      filename: '[name].js',
      publicPath: '/'
    },
    plugins: Plugins.get(nodeEnv),
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
