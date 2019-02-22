const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Path = require('./lib/path')

const PORT = process.env.PORT || 3000

const NO_PARSE = new RegExp(
  [
    'rimraf',
    'prettier',
    'prettier-eslint',
    'enzyme',
    'enzyme-adapter-react-16',
    'enzyme-to-json',
    'eslint-config-standard',
    'eslint-plugin-import',
    'eslint-plugin-node',
    'eslint-plugin-promise',
    'eslint-plugin-react',
    'eslint-plugin-standard',
    'jest',
    'express' // for Heroku
  ].join('|')
)

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
  'scu-inspector'
]

const DEV_SERVER = {
  hot: true,
  host: '0.0.0.0',
  port: PORT,
  compress: true,
  contentBase: Path.resolve('src', 'assets'),
  disableHostCheck: true, // for Heroku
  historyApiFallback: true
}

const ALIAS = {
  '~': Path.resolve('src')
}

const DEVTOOL = 'eval'

const DEVTOOL_PROD = 'source-map'

const TARGET = 'web'

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
 * Webpack loaders
 * @type {Object}
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
        path: `${Path.resolve('webpack')}/postcss/postcss.config.js`
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
  }
}

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

const DEV_PLUGINS = [new webpack.HotModuleReplacementPlugin()]

const PROD_PLUGINS = [
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css'
  })
]

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
  DEFAULT_PLUGINS,
  DEV_PLUGINS,
  PROD_PLUGINS
}
