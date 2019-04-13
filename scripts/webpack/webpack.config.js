const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Path = require('./lib/path')
const Loaders = require('./lib/loaders')
const Plugins = require('./lib/plugins')
const {
  PORT,
  ALIAS,
  VENDOR,
  NO_PARSE,
  DEVTOOL,
  DEVTOOL_PROD,
  DEV_SERVER,
  TARGET,
  SPLIT_CHUNKS,
  LOADERS,
  DEV_PLUGINS,
  PROD_PLUGINS
} = require('./config')

// prepare
const getLoaders = Loaders.get(LOADERS)
const getPlugins = Plugins.get(DEV_PLUGINS, PROD_PLUGINS)

const entryApp = {
  development: [
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/only-dev-server'
  ],
  production: []
}

/**
 * Configure Webpack
 * @param  {Object?} [env={}]
 * @return {Object}
 */
function configure (env = {}) {
  const mode = env.production ? 'production' : 'development'
  const isDev = mode === 'development'

  /**
   * Config
   * @type {Object}
   */
  const config = {
    mode,
    target: TARGET,
    context: Path.resolve('src'),
    performance: {
      hints: isDev ? false : 'warning'
    },
    resolve: {
      symlinks: false,
      alias: ALIAS
    },
    devtool: isDev ? DEVTOOL : DEVTOOL_PROD,
    plugins: getPlugins(mode),
    entry: {
      app: [...entryApp[mode], '@babel/polyfill', './index'],
      vendor: VENDOR
    },
    output: {
      path: Path.resolve('public'),
      filename: isDev ? '[name].js' : '[name].[contenthash].js'
    },
    optimization: {
      namedModules: isDev,
      noEmitOnErrors: true,
      concatenateModules: true,
      nodeEnv: mode,
      splitChunks: SPLIT_CHUNKS
    },
    module: {
      noParse: NO_PARSE,
      rules: [
        ...getLoaders('javascript', 'svg', 'url'),
        {
          test: /\.css$/,
          include: [Path.resolve('src')],
          use: isDev
            ? getLoaders('style', 'css', 'postcss')
            : [MiniCssExtractPlugin.loader, ...getLoaders('css', 'postcss')]
        }
      ]
    }
  }

  if (isDev) {
    Object.assign(config, {
      devServer: DEV_SERVER
    })
  }

  return config
}

module.exports = configure
