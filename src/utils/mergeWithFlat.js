import * as R from 'ramda'

/**
 * Concat with flat value
 * @param  {Array}  a
 * @param  {*}      b
 * @return {Array}
 */
function mergeWithFlat (a, b) {
  return R.compose(
    R.concat(a),
    R.of
  )(b)
}

export default R.curry(mergeWithFlat)
