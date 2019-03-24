import * as R from 'ramda'
import { parseCode } from '~/chess/helpers'

/**
 * Get parsed code after getting difference
 * @param  {Array}  aSnapshot
 * @param  {Array}  bSnapshot
 * @return {Object}
 */
function diffSnapshot (aSnapshot, bSnapshot) {
  return R.compose(
    parseCode,
    R.prop(0),
    R.difference(aSnapshot)
  )(bSnapshot)
}

export default R.curry(diffSnapshot)
