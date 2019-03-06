import * as R from 'ramda'
import isPieceThere from './isPieceThere'

/**
 * Is index of movable axis blocked?
 * @param  {Array}   snapshot
 * @param  {Array}   movableAxis
 * @param  {Number}  idx
 * @return {Boolean}
 */
function isBlockedAt (snapshot, movableAxis, idx) {
  return R.compose(
    isPieceThere(snapshot),
    R.prop(idx)
  )(movableAxis)
}

export default R.curry(isBlockedAt)
