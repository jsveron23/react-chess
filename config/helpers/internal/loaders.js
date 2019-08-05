const R = require('ramda')
const colors = require('colors') // eslint-disable-line

const lazy = R.thunkify(R.identity)

/**
 * @param  {Object}   loaders
 * @return {Function}
 */
module.exports = function createReduceCb (loaders) {
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
