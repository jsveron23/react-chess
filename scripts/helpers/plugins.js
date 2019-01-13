const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Path = require('../libs/path')

/**
  * Get plugins
  * @return {Function}
  */
function _get () {
  const defaultPlugins = [
    new HtmlWebpackPlugin({
      inject: 'body',
      chunks: ['vendor', 'app'],
      filename: 'index.html',
      template: `${Path.resolve('src', 'assets')}/index.html`
    })
  ]

  return (nodeEnv) => {
    const devPlugins = [
      new webpack.HotModuleReplacementPlugin()
    ]

    const prodPugins = [
      new MiniCssExtractPlugin({
        filename: nodeEnv === 'development' ? '[name].css' : '[name].[hash].css'
      })
    ]

    const plugins = [
      ...defaultPlugins,
      ...(nodeEnv === 'development' ? devPlugins : prodPugins)
    ]

    return plugins
  }
}

const get = _get()
get.extractCSSLoader = MiniCssExtractPlugin.loader

module.exports = {
  get
}
