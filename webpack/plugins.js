const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { DEFAULT_PLUGINS, DEV_PLUGINS, PROD_PLUGINS } = require('./config')

/**
 * Get plugins
 * @return {string} nodeEnv
 */
function get (nodeEnv) {
  return [
    ...DEFAULT_PLUGINS,
    ...(nodeEnv === 'development' ? DEV_PLUGINS : PROD_PLUGINS)
  ]
}

module.exports = {
  get,
  extractCSSLoader: MiniCssExtractPlugin.loader
}
