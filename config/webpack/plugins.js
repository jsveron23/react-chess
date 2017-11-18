const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { staticPath } = require('../../lib/path')
const flatten = require('../../lib/flatten')

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
      template: `${staticPath}/index.html`
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
   * @param  {String} env
   * @return {Array}
   */
  get (env) {
    return this.pluginList.concat(
      flatten(this[env]),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
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
