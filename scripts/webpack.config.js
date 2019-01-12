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
      path: Path.resolve('dist'),
      filename: '[name].js',
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
        {
          test: /\.css$/,
          include: [Path.resolve('src')],
          use: isDev
            ? Loaders.get('style', 'css', 'postcss')
            : Plugins.extractCSS({
              fallback: Loaders.get.fallback,
              use: Loaders.get('css', 'postcss')
            })
        }
      ].concat(Loaders.get('javascript', 'svg'))
    }
  }

  return config
}

module.exports = configure
