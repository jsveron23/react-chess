import * as R from 'ramda'

/**
 * Extract keys from object then apply to given function
 * @param  {Function} fn
 * @param  {Array}    keys
 * @param  {Object}   obj
 * @return {*}
 */
function applyObject (fn, keys, obj) {
  return R.compose(
    R.apply(fn),
    R.props(keys)
  )(obj)
}

export default R.curry(applyObject)
