const R = require('ramda')
const colors = require('colors') // eslint-disable-line

/**
 * @param  {Object}   loaders
 * @return {Function}
 */
function createReduceCb (loaders) {
  const lazy = R.thunkify(R.identity)

  /**
   * @callback
   * @param  {Array}  acc
   * @param  {String} loaderName
   * @return {Array}
   */
  return (acc, loaderName) => {
    return R.compose(
      R.ifElse(R.isNil, lazy(acc), (loader) => {
        console.log(`# [${loaderName}-loader] is loaded!`.underline.green)

        return [...acc, loader]
      }),
      R.prop(loaderName)
    )(loaders)
  }
}

/**
 * Get loaders
 * @param  {Object}   loaders
 * @return {Function}
 */
function get (loaders) {
  const reduceCb = createReduceCb(loaders)

  /**
   * @param  {...String} [...types]
   * @return {Array}
   */
  return (...types) => types.reduce(reduceCb, [])
}

module.exports = {
  get
}
