import * as R from 'ramda'

/**
 * Simple merge
 * @param  {Object} a
 * @param  {Object} b
 * @return {Object}
 */
function merge (a, b) {
  // only allow 2 arguments
  return R.mergeWith(R.identity)(a, b)
}

export default R.curry(merge)
