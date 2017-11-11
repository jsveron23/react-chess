const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { assetsPath } = require('../libs/path')

/**
 * Plugins
 * @namespace Plugins
 */
const Plugins = {
  pluginList: [
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

  /**
   * Get plugins
   * @param  {String} nodeEnv
   * @return {Array}
   */
  get (nodeEnv) {
    const flattened = [].concat.apply([], this[nodeEnv])

    return this.pluginList.concat(
      flattened,
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(nodeEnv)
      })
    )
  },

  /**
   * Extract single CSS file on production
   * @param  {Array} use
   * @return {Array}
   */
  extractCSS (use) {
    return ExtractTextPlugin.extract(use)
  }
}

module.exports = Plugins
