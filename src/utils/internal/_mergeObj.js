import * as R from 'ramda'

/**
 * Merge object
 * @param  {Object} a
 * @param  {Object} b
 * @return {Object}
 */
function _mergeObj (a, b) {
  // only allow 2 arguments
  return R.mergeWith(R.identity)(a, b)
}

export default R.curry(_mergeObj)
