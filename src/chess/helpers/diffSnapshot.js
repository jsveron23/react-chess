import { difference, compose, curry, prop } from 'ramda'
import { parseCode } from '~/chess/helpers'

/**
 * Get parsed code after getting difference
 * @param  {Array}  aSnapshot
 * @param  {Array}  bsnapshot
 * @return {Object}
 */
function diffSnapshot (aSnapshot, bsnapshot) {
  return compose(
    parseCode,
    prop(0),
    difference(aSnapshot)
  )(bsnapshot)
}

export default curry(diffSnapshot)
