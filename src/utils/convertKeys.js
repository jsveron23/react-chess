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
      const nextKey = names[key] || key

      return {
        ...acc,
        [nextKey]: obj[key]
      }
    }, {}),
    keys
  )(obj)
}

export default curry(convertKeys)
