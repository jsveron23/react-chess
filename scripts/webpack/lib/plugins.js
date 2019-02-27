/**
 * Get plugins
 * @return {string} nodeEnv
 */
function get (defaultPlugins, devPlugins, prodPlugins) {
  return (nodeEnv) => [
    ...defaultPlugins,
    ...(nodeEnv === 'development' ? devPlugins : prodPlugins)
  ]
}

module.exports = {
  get
}
