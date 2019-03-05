import { curry, keys, compose, reduce, assoc } from 'ramda'

/**
 * Convert key name (composable)
 * @param  {Object} names
 * @param  {Object} obj
 * @return {Object}
 */
function convertKeys (names, obj) {
  return compose(
    reduce((acc, key) => assoc(names[key] || key, obj[key], acc), {}),
    keys
  )(obj)
}

export default curry(convertKeys)
