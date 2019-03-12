import * as R from 'ramda'

/**
 * Convert key name (composable)
 * @param  {Object} names
 * @param  {Object} obj
 * @return {Object}
 */
function convertKeys (names, obj) {
  const reduceCb = (acc, key) => R.assoc(names[key] || key, obj[key])(acc)

  return R.compose(
    R.reduce(reduceCb, {}),
    R.keys
  )(obj)
}

export default R.curry(convertKeys)
