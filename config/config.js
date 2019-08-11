const R = require('ramda')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const Path = require('./helpers/path')

const PORT = process.env.PORT || 3000

exports.PORT = PORT
exports.DEVTOOL = 'eval'
exports.DEVTOOL_PROD = 'source-map'
exports.TARGET = 'web'
exports.ALIAS = {
  'react-dom': '@hot-loader/react-dom',
  '~': Path.resolve('src')
}

/**
 * Optimization
 */

exports.VENDOR = [
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
  'scu-inspector'
]

const LINT = [
  'prettier',
  'prettier-eslint',
  'eslint-config-standard',
  'eslint-plugin-import',
  'eslint-plugin-node',
  'eslint-plugin-promise',
  'eslint-plugin-react',
  'eslint-plugin-standard'
]

exports.NO_PARSE = R.compose(
  (txt) => new RegExp(txt),
  R.join('|'),
  R.concat([
    'rimraf',
    'enzyme',
    'enzyme-adapter-react-16',
    'enzyme-to-json',
    'jest',
    'coveralls'
  ])
)(LINT)

exports.MINIMIZER = [
  new TerserPlugin({
    chunkFilter: (chunk) => {
      if (chunk.name === 'vendor') {
        return false
      }

      return true
    },
    terserOptions: {
      compress: {
        drop_console: true
      },
      ie8: false
    }
  })
]

exports.SPLIT_CHUNKS = {
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

exports.DEV_SERVER = {
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

exports.LOADERS = {
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
      modules: {
        localIdentName: '[local]--[hash:base64:5]'
      },
      importLoaders: 1,
      localsConvention: 'camelCaseOnly'
    }
  },

  postcss: {
    loader: 'postcss-loader',
    options: {
      config: {
        path: `${Path.resolve('config', 'postcss')}/postcss.config.js`
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

exports.DEV_PLUGINS = R.concat(DEFAULT_PLUGINS, [
  new webpack.HotModuleReplacementPlugin()
])

exports.PROD_PLUGINS = R.concat(DEFAULT_PLUGINS, [
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css'
  })
])
