const colors = require('colors') // eslint-disable-line
const { LOADERS } = require('../config')

/**
 * Get loaders
 * @param  {...string} [...types]
 * @return {Function}
 */
function _get (...types) {
  const loaders = types.reduce((acc, loaderName) => {
    const loader = LOADERS[loaderName]

    if (!loader) {
      console.log(`${loaderName}-loader not found!`.underline.red)

      return acc
    }

    return [...acc, loader]
  }, [])

  return loaders
}

module.exports = {
  get: _get
}
