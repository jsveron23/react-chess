const R = require('ramda')
const chalk = require('chalk')

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
        console.log(chalk.green.underline(`# [${loaderName}-loader] is loaded!`))

        return [...acc, loader]
      }),
      R.prop(loaderName)
    )(loaders)
  }
}
