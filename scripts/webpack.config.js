const Path = require('./libs/path')
const Loaders = require('./helpers/loaders')
const Plugins = require('./helpers/plugins')
const {
  PORT,
  ALIAS,
  VENDOR,
  NO_PARSE,
  DEVTOOL,
  DEVTOOL_PROD,
  DEV_SERVER,
  TARGET
} = require('./config')

/**
 * Configure
 * @param  {Object} [env={}]
 * @return {Object}
 */
function configure (env = {}) {
  const mode = env.production ? 'production' : 'development'
  const isDev = mode === 'development'
  const config = {
    mode,
    devServer: isDev ? DEV_SERVER : undefined,
    target: TARGET,
    context: Path.resolve('src'),
    performance: {
      hints: isDev ? false : 'warning'
    },
    resolve: {
      symlinks: false,
      alias: ALIAS
    },
    devtool: isDev ? DEVTOOL_PROD : DEVTOOL,
    plugins: Plugins.get(mode),
    entry: {
      app: [
        ...(isDev ? [
          `webpack-dev-server/client?http://localhost:${PORT}`,
          'webpack/hot/only-dev-server'
        ] : []),
        './index'
      ],
      vendor: VENDOR
    },
    output: {
      path: Path.resolve('public'),
      filename: isDev ? '[name].js' : '[name].[contenthash].js',
      publicPath: '/'
    },
    optimization: {
      namedModules: isDev,
      nodeEnv: mode,
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            minSize: 1,
            reuseExistingChunk: true
          }
        }
      }
    },
    module: {
      noParse: NO_PARSE,
      rules: [
        ...Loaders.get('javascript', 'svg'),
        {
          test: /\.css$/,
          include: [Path.resolve('src')],
          use: isDev
            ? Loaders.get('style', 'css', 'postcss')
            : [
              Plugins.get.extractCSSLoader,
              ...Loaders.get('css', 'postcss')
            ]
        }
      ]
    }
  }

  return config
}

module.exports = configure
