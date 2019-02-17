import { curry, includes } from 'ramda'
import { isExist } from '~/utils'
import { _hasCode } from './internal/_computeSpecial'
import convertTileToAxis from '../helpers/convertTileToAxis'
import replaceSnapshot from '../helpers/replaceSnapshot'

const DOUBLE_STEP = 'doubleStep'
const DOUBLE_STEP_TILES = {
  w: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
  b: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7']
}

const PROMOTION = 'promotion'
const PROMOTION_TILES = {
  w: ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
  b: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
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
function computeSpecial (side, special, tile, snapshot, movableAxis) {
  if (special.length > 1) {
    // -> Pawn

    // ----------------
    // before rendering (append movable axis)
    // ----------------
    const isFirstMove = includes(tile, DOUBLE_STEP_TILES[side])
    const isDoubleStep = includes(DOUBLE_STEP, special) && isFirstMove

    if (isDoubleStep && isExist(movableAxis)) {
      const hasCode = _hasCode(snapshot, movableAxis)

      // if some piece on movable
      // it works like `excludeBlock`
      if (hasCode) {
        return { snapshot, movableAxis }
      }

      const { x, y } = convertTileToAxis(tile)
      const nextY = side === 'w' ? y + 2 : y - 2
      const nextAxis = [x, nextY]

      return { snapshot, movableAxis: [...movableAxis, nextAxis] }
    }

    // ----------------
    // after moving (transforming as Queen)
    // ----------------
    const isMovedToEnd = includes(tile, PROMOTION_TILES[side])
    const shouldPromotion = includes(PROMOTION, special) && isMovedToEnd

    if (shouldPromotion && isExist(snapshot)) {
      const nextSnapshot = replaceSnapshot(`${side}Q${tile}`, tile, snapshot)

      return { snapshot: nextSnapshot, movableAxis }
    }
  } else {
    // -> King
  }

  return { snapshot, movableAxis }
}

export default curry(computeSpecial)
