import { compose, curry, reject, concat } from 'ramda'
import { isEmpty, isExist } from '~/utils'
import _applyDoubleStep from './internal/_applyDoubleStep'
import _applyEnPassant from './internal/_applyEnPassant'
import _applyPromotion from './internal/_applyPromotion'

/**
 * Include special (snapshot or movableAxis)
 * @param  {string} side
 * @param  {Array}  special
 * @param  {string} tile
 * @param  {Array?} snapshot
 * @param  {Array?} movableAxis
 * @return {Object}
 *  - snapshot -> after moving
 *  - movableAxis -> before rendering
 */
function includeSpecial (side, special, tile, snapshot, movableAxis) {
  if (special.length > 1) {
    // -> Pawn

    // ----------------
    // before rendering (append movable axis)
    // ----------------
    const enPassantAxis = _applyEnPassant(side, tile, snapshot)
    const doubleStepAxis = _applyDoubleStep(side, tile, special)(
      snapshot,
      movableAxis
    )
    const nextMovableAxis = compose(
      reject(isEmpty),
      concat(enPassantAxis)
    )(doubleStepAxis)

    if (isExist(nextMovableAxis)) {
      return { snapshot, movableAxis: nextMovableAxis }
    }

    // ----------------
    // after moving (transforming as Queen)
    // ----------------
    const nextSnapshot = _applyPromotion(side, tile, special, snapshot)

    if (isExist(nextSnapshot)) {
      return { snapshot: nextSnapshot, movableAxis }
    }
  } else {
    // -> King
  }

  return { snapshot, movableAxis }
}

export default curry(includeSpecial)
