import { difference, compose, curry, prop as extract } from 'ramda'
import { parseCode } from '~/chess/helpers'

/**
 * Get parsed code after getting difference
 * @param  {Array}  aSnapshot
 * @param  {Array}  bsnapshot
 * @return {Object}
 */
export const _diffSnapshot = curry(function _diffSnapshot (
  aSnapshot,
  bsnapshot
) {
  return compose(
    parseCode,
    extract(0),
    difference(aSnapshot)
  )(bsnapshot)
})
