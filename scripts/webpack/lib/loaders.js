const R = require('ramda')
const colors = require('colors') // eslint-disable-line

/**
 * Get loaders
 * @param  {Array}    loaders
 * @return {Function}
 */
function get (loaders) {
  const reduceCb = (acc, loaderName) => {
    return R.ifElse(
      R.isNil,
      (loader) => {
        console.log(`${loaderName}-loader not found!`.underline.red)

        return loader
      },
      (loader) => [...acc, loader]
    )(loaders[loaderName])
  }

  /**
   * @param  {...String} [...types]
   * @return {Array}
   */
  return (...types) => types.reduce(reduceCb, [])
}

module.exports = {
  get
}
