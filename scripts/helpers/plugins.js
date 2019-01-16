const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { DEFAULT_PLUGINS, DEV_PLUGINS, PROD_PLUGINS } = require('../config')

/**
 * Get plugins
 * @return {Function}
 */
function _get () {
  return (nodeEnv) => {
    const plugins = [
      ...DEFAULT_PLUGINS,
      ...(nodeEnv === 'development' ? DEV_PLUGINS : PROD_PLUGINS)
    ]

    return plugins
  }
}

const get = _get()
get.extractCSSLoader = MiniCssExtractPlugin.loader

module.exports = {
  get
}
