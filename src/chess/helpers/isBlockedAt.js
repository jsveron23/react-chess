import { compose, prop, curry } from 'ramda'
import { isPieceThere } from '~/chess/helpers'

/**
 * Is index of movable axis blocked?
 * @param  {Array}   snapshot
 * @param  {Array}   movableAxis
 * @param  {number}  idx
 * @return {boolean}
 */
function isBlockedAt (snapshot, movableAxis, idx) {
  return compose(
    isPieceThere(snapshot),
    prop(idx)
  )(movableAxis)
}

export default curry(isBlockedAt)
