const colors = require('colors') // eslint-disable-line
const { LOADERS } = require('./config')

/**
 * Get loaders
 * @param  {...string} [...types]
 * @return {Array}
 */
function get (...types) {
  return types.reduce((acc, loaderName) => {
    const loader = LOADERS[loaderName]

    if (!loader) {
      console.log(`${loaderName}-loader not found!`.underline.red)

      return acc
    }

    return [...acc, loader]
  }, [])
}

module.exports = {
  get
}
