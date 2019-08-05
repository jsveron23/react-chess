/**
 * Get loaders
 * @param  {Object}   loaders
 * @return {Function}
 */
exports.get = function get (loaders) {
  const cb = require('./internal/loaders')(loaders)

  /**
   * @param  {...String} [...types]
   * @return {Array}
   */
  return (...types) => types.reduce(cb, [])
}
