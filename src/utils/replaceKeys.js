import * as R from 'ramda'

/**
 * Replace keys
 * @param  {Object} names
 * @param  {Object} obj
 * @return {Object}
 */
function replaceKeys (names, obj) {
  const reduceCb = (acc, key) => R.assoc(names[key] || key, obj[key])(acc)

  return R.compose(
    R.reduce(reduceCb, {}),
    R.keys
  )(obj)
}

export default R.curry(replaceKeys)
