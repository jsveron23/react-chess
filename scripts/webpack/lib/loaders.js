const colors = require('colors') // eslint-disable-line

/**
 * Get loaders
 * @param  {Array} loaders
 * @param  {Array} types
 * @return {Array}
 */
function get (loaders) {
  return (...types) => {
    return types.reduce((acc, loaderName) => {
      const loader = loaders[loaderName]

      if (!loader) {
        console.log(`${loaderName}-loader not found!`.underline.red)

        return acc
      }

      return [...acc, loader]
    }, [])
  }
}

module.exports = {
  get
}
