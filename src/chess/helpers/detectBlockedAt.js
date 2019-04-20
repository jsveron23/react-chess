import * as R from 'ramda'
import detectRemainByAxis from './detectRemainByAxis'

/**
 * Detect piece there?
 * @param  {Array}   snapshot
 * @param  {Array}   movableAxis
 * @param  {Number}  idx
 * @return {Boolean}
 */
function detectBlockedAt (snapshot, movableAxis, idx) {
  return R.compose(
    detectRemainByAxis(snapshot),
    R.nth(idx)
  )(movableAxis)
}

export default R.curry(detectBlockedAt)
