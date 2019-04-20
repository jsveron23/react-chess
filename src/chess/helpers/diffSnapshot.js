import * as R from 'ramda'

/**
 * Get parsed code after getting difference
 * @param  {Array}  aSnapshot
 * @param  {Array}  bSnapshot
 * @return {Object}
 */
function diffSnapshot (aSnapshot, bSnapshot) {
  return R.compose(
    R.defaultTo(''),
    R.nth(0),
    R.difference(aSnapshot)
  )(bSnapshot)
}

export default R.curry(diffSnapshot)
