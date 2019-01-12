const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Path = require('../libs/path')

/**
 * Default plugin(s)
 */
const PLUGINS = [
  new HtmlWebpackPlugin({
    inject: 'body',
    chunks: ['vendor', 'app'],
    filename: 'index.html',
    template: `${Path.resolve('src', 'assets')}/index.html`
  })
]

/**
  * Get plugins
  * @param  {string} nodeEnv
  * @return {Array}
  */
function get (nodeEnv) {
  const devPlugins = [
    new webpack.HotModuleReplacementPlugin()
  ]

  const prodPugins = [
    new ExtractTextPlugin('[name].css')
  ]

  const plugins = [
    ...PLUGINS,
    ...(nodeEnv === 'development' ? devPlugins : prodPugins)
  ]

  return plugins
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
