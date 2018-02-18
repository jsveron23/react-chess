const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { assetsPath } = require('../../lib/path')
const flatten = require('../../lib/flatten')

function extractText (use) {
  return ExtractTextPlugin.extract(use)
}

/** @namespace Plugins */
const Plugins = {
  list: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks (module) {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      chunks: ['vendor', 'app'],
      filename: 'index.html',
      template: `${assetsPath}/index.html`
    })
  ],

  development: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],

  production: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false
    })
  ],

  extractCSS: extractText,

  get (env = '') {
    const plugins = this[env]

    return this.list.concat(
      flatten(plugins),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
      })
    )
  }
}

module.exports = Plugins
