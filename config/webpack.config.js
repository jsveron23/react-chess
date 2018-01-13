const Loaders = require('./webpack/loaders')
const Plugins = require('./webpack/plugins')
const { distPath, srcPath, assetsPath, getAbsPath } = require('../lib/path')
const { noParse, port, devServer } = require('./')

function configure ({ production } = {}) {
  const env = production ? 'production' : 'development'
  const isDev = env === 'development'
  const entry = {
    app: ['./index'],
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-thunk',
      'prop-types',
      'classnames'
    ]
  }
  const module = {
    noParse
  }
  const resolve = {
    alias: {
      '@components': getAbsPath('src/components'),
      '@containers': getAbsPath('src/containers'),
      '@pieces': getAbsPath('src/pieces'),
      '@utils': getAbsPath('src/utils'),
      '@styles': getAbsPath('src/styles'),
      '@assets': getAbsPath('src/assets'),
      '@actions': getAbsPath('src/actions'),
      '@reducers': getAbsPath('src/reducers'),
      '@store': getAbsPath('src/store')
    }
  }

  // loaders
  const eslintLoader = Object.assign({}, Loaders.get('eslint'), {
    enforce: 'pre'
  })
  const jsLoader = Loaders.get('javascript')
  const cssLoader = {
    test: /\.css$/,
    include: [srcPath],
    use: Loaders.get('style css postcss')
  }

  if (env === 'development') {
    entry.app.unshift(
      `webpack-dev-server/client?http://localhost:${port}`,
      'webpack/hot/only-dev-server'
    )

    module.rules = [eslintLoader, jsLoader, cssLoader]
  } else {
    module.rules = [jsLoader, {
      ...cssLoader,
      use: Plugins.extractCSS({
        fallback: Loaders.get('style'),
        use: Loaders.get('css postcss')
      })
    }]
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
    devServer: isDev ? Object.assign({}, devServer, {
      contentBase: assetsPath
    }) : undefined,
    resolve,
    entry,
    module
  }
}

module.exports = configure
