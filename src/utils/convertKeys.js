import * as R from 'ramda'

/**
 * Convert key name (composable)
 * @param  {Object} names
 * @param  {Object} obj
 * @return {Object}
 */
function convertKeys (names, obj) {
  return R.compose(
    R.reduce((acc, key) => R.assoc(names[key] || key, obj[key], acc), {}),
    R.keys
  )(obj)
}

export default R.curry(convertKeys)
