const R = require('ramda')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Path = require('./lib/path')
const createRe = require('./lib/createRe')

/**
 * Generic
 */

const PORT = process.env.PORT || 3000

const DEVTOOL = 'eval'

const DEVTOOL_PROD = 'source-map'

const TARGET = 'web'

const ALIAS = {
  'react-dom': '@hot-loader/react-dom',
  '~': Path.resolve('src')
}

/**
 * Optimization
 */

const NO_PARSE = R.compose(
  createRe,
  R.join('|'),
  R.concat([
    'rimraf',
    'prettier',
    'prettier-eslint',
    'enzyme',
    'enzyme-adapter-react-16',
    'enzyme-to-json',
    'jest',
    'coveralls'
  ])
)([
  'eslint-config-standard',
  'eslint-plugin-import',
  'eslint-plugin-node',
  'eslint-plugin-promise',
  'eslint-plugin-react',
  'eslint-plugin-standard'
])

const VENDOR = [
  'react',
  'react-dom',
  'prop-types',
  'classnames',
  'redux',
  'redux-thunk',
  'react-redux',
  'ramda',
  'redux-undo',
  'memoize-one',
  'autobind-decorator',
  'scu-inspector'
]

const SPLIT_CHUNKS = {
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

/**
 * Development server
 */

const DEV_SERVER = {
  hot: true,
  host: '0.0.0.0',
  port: PORT,
  compress: true,
  contentBase: Path.resolve('src', 'assets'),
  historyApiFallback: true
}

/**
 * Loaders
 */

const LOADERS = {
  eslint: {
    test: /\.js$/,
    include: [Path.resolve('src')],
    loader: 'eslint-loader',
    options: {
      configFile: `${Path.root}/.eslintrc.json`
    }
  },

  javascript: {
    test: /\.js$/,
    include: [Path.resolve('src')],
    loader: 'babel-loader'
  },

  style: 'style-loader',

  css: {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      modules: true,
      importLoaders: 1,
      localIdentName: '[local]--[hash:base64:5]',
      camelCase: 'only'
    }
  },

  postcss: {
    loader: 'postcss-loader',
    options: {
      config: {
        path: `${Path.webpack}/postcss/postcss.config.js`
      }
    }
  },

  svg: {
    test: /\.svg$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'svg-react-loader'
      }
    ]
  },

  url: {
    test: /\.(png|jpg|gif)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    ]
  }
}

/**
 * Plugins
 */

const DEFAULT_PLUGINS = [
  new HtmlWebpackPlugin({
    inject: 'body',
    chunks: ['vendor', 'app'],
    filename: 'index.html',
    template: `${Path.resolve('src', 'assets')}/index.html`,
    minify: {
      removeComments: true
    }
  })
]

const DEV_PLUGINS = R.concat(DEFAULT_PLUGINS, [
  new webpack.HotModuleReplacementPlugin()
])

const PROD_PLUGINS = R.concat(DEFAULT_PLUGINS, [
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css'
  })
])

/**
 * @exports
 */

module.exports = {
  PORT,
  NO_PARSE,
  VENDOR,
  DEV_SERVER,
  ALIAS,
  DEVTOOL,
  DEVTOOL_PROD,
  TARGET,
  SPLIT_CHUNKS,
  LOADERS,
  DEV_PLUGINS,
  PROD_PLUGINS
}
