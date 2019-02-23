import { curry, keys, compose, reduce } from 'ramda'

/**
 * Convert key name (composable)
 * @param  {Object} names
 * @param  {Object} obj
 * @return {Object}
 */
function convertKeys (names, obj) {
  return compose(
    reduce((acc, key) => {
      return {
        ...acc,
        [names[key] || key]: obj[key]
      }
    }, {}),
    keys
  )(obj)
}

export default curry(convertKeys)
