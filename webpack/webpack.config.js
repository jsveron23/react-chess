const Path = require('./lib/path')
const Loaders = require('./loaders')
const Plugins = require('./plugins')
const {
  PORT,
  ALIAS,
  VENDOR,
  NO_PARSE,
  DEVTOOL,
  DEVTOOL_PROD,
  DEV_SERVER,
  TARGET,
  SPLIT_CHUNKS
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
        ...(isDev
          ? [
            `webpack-dev-server/client?http://localhost:${PORT}`,
            'webpack/hot/only-dev-server'
          ]
          : []),
        '@babel/polyfill',
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
      splitChunks: SPLIT_CHUNKS
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
            : [Plugins.extractCSSLoader, ...Loaders.get('css', 'postcss')]
        }
      ]
    }
  }

  return config
}

module.exports = configure
