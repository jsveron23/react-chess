const R = require('ramda')

/**
 * Get plugins
 * @param  {Array?}   devPlugins
 * @param  {Array?}   prodPlugins
 * @return {Function}
 */
function get (devPlugins = [], prodPlugins = []) {
  const lazy = R.thunkify(R.identity)

  /**
   * @param  {String} nodeEnv
   * @return {Array}
   */
  return R.ifElse(R.equals('development'), lazy(devPlugins), lazy(prodPlugins))
}

module.exports = {
  get
}
