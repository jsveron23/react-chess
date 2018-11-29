const {
  assetsPath,
  distPath,
  srcPath,
  resolve
} = require('./path')
const Loaders = require('./webpack.loaders')
const Plugins = require('./webpack.plugins')

const PORT = process.env.PORT || 3000
const noParse = new RegExp([
  'rimraf',
  'express' // for Heroku
].join('|'))

function configure (env = {}, args) {
  const mode = env.production ? 'production' : 'development'
  const entry = {
    app: ['./index'],
    vendor: [
      'react',
      'react-dom',
      'prop-types',
      'classnames'
    ]
  }
  const output = {
    path: distPath,
    filename: '[name].js',
    publicPath: '/'
  }
  const optimization = {
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
  }
  const module = {
    noParse,
    rules: [
      ...Loaders.get('javascript svg'),
      {
        test: /\.css$/,
        include: [srcPath],
        use: mode === 'development'
          ? Loaders.get('style css postcss')
          : Plugins.extractCSS({
            fallback: Loaders.get('style'),
            use: Loaders.get('css postcss')
          })
      }
    ]
  }
  const devtool = mode === 'development' ? 'cheap-module-eval-source-map' : 'source-map'
  const plugins = Plugins.get(mode)
  const config = {
    target: 'web',
    context: srcPath,
    resolve: {
      symlinks: false,
      alias: {
        '~components': resolve('src', 'components'),
        '~utils': resolve('src', 'utils'),
        '~styles': resolve('src', 'styles'),
        '~assets': assetsPath
      }
    },
    mode,
    entry,
    output,
    optimization,
    module,
    devtool,
    plugins
  }

  if (mode === 'development') {
    config.devServer = {
      hot: true,
      host: '0.0.0.0',
      port: PORT,
      compress: true,
      contentBase: assetsPath,
      disableHostCheck: true, // for Heroku
      historyApiFallback: true
    }

    config.entry.app.unshift(
      `webpack-dev-server/client?http://localhost:${PORT}`,
      'webpack/hot/only-dev-server'
    )
  }

  return config
}

module.exports = configure
