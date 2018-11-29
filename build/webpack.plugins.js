const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { assetsPath } = require('./path')

/**
 * Plugins
 * @namespace Plugins
 */
const PLUGINS = [
  new HtmlWebpackPlugin({
    inject: 'body',
    chunks: ['vendor', 'app'],
    filename: 'index.html',
    template: `${assetsPath}/index.html`
  })
]

/**
  * Get plugins
  * @param  {String} nodeEnv
  * @return {Array}
  */
function get (nodeEnv) {
  const devPlugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
  const prodPugins = [
    new ExtractTextPlugin('[name].css')
  ]
  const plugins = [
    ...PLUGINS,
    ...(nodeEnv === 'development' ? devPlugins : prodPugins)
  ]

  return [
    ...plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv)
    })
  ]
}

/**
  * Extract single CSS file on production
  * @param  {Array} use
  * @return {Array}
  */
function extractCSS (use) {
  return ExtractTextPlugin.extract(use)
}

module.exports = {
  get,
  extractCSS
}
