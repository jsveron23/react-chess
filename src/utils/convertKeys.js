import * as R from 'ramda'

/**
 * Convert key name (composable)
 * @param  {Object} names
 * @param  {Object} obj
 * @return {Object}
 */
function convertKeys (names, obj) {
  return R.compose(
    R.reduce((acc, key) => {
      const nextKey = names[key] || key

      return {
        ...acc,
        [nextKey]: obj[key]
      }
    }, {}),
    R.keys
  )(obj)
}

export default R.curry(convertKeys)
