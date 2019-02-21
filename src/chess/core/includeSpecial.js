import { compose, curry, includes, reject, concat } from 'ramda'
import { isEmpty, isExist } from '~/utils'
import { replaceSnapshot } from '~/chess/helpers'
import _applyDoubleStep from './internal/_applyDoubleStep'
import _applyEnPassant from './internal/_applyEnPassant'

const PROMOTION = 'promotion'
const PROMOTION_TILES = {
  w: ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
  b: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
}

function _applyPromotion (side, tile, special, snapshot) {
  const isMovedToEnd = includes(tile, PROMOTION_TILES[side])
  const shouldPromotion = includes(PROMOTION, special) && isMovedToEnd
  let nextSnapshot = []

  if (shouldPromotion) {
    nextSnapshot = replaceSnapshot(`${side}Q${tile}`, tile, snapshot)
  }

  return nextSnapshot
}

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
