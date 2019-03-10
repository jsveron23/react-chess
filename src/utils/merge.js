import * as R from 'ramda'

/**
 * Simple merge
 * @param  {Object} a
 * @param  {Object} b
 * @return {Object}
 */
function merge (a, b) {
  return R.mergeWith(R.identity, a, b)
}

export default R.curry(merge)
