/**
 * Get plugins
 * @param  {Array}    defaultPlugins
 * @param  {Array}    devPlugins
 * @param  {Array}    prodPlugins
 * @return {Function}
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
