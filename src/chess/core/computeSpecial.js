import { curry, includes } from 'ramda'
import {
  transformTileToAxis,
  transformAxisToTile,
  replaceSnapshot,
  findSnapshotItem
} from '~/chess/helpers'
import { isExist } from '~/utils'

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
  const len = special.length

  if (len > 1) {
    // -> Pawn

    // ----------------
    // before rendering (to display extended movable)
    // ----------------
    const isFirstMove = includes(tile, DOUBLE_STEP_TILES[side])
    const isDoubleStep = includes(DOUBLE_STEP, special) && isFirstMove

    if (isDoubleStep && isExist(movableAxis)) {
      const [startAxis] = movableAxis // it should be one tile
      const startTile = transformAxisToTile(startAxis)
      const snapshotItem = findSnapshotItem(startTile, snapshot)

      // if some piece on the path
      // it works like `excludeBlock`
      if (isExist(snapshotItem)) {
        return { snapshot, movableAxis }
      }

      const { x, y } = transformTileToAxis(tile)
      const nextY = side === 'w' ? y + 2 : y - 2

      return { snapshot, movableAxis: [...movableAxis, [x, nextY]] }
    }

    // ----------------
    // after moving (to transform as Queen)
    // ----------------
    const isMovedToEnd = includes(tile, PROMOTION_TILES[side])
    const shouldPromotion = includes(PROMOTION, special) && isMovedToEnd

    if (shouldPromotion && isExist(snapshot)) {
      const nextSnapshot = replaceSnapshot(`${side}Q${tile}`, tile, snapshot)

      return { snapshot: nextSnapshot, movableAxis }
    }
  } else {
    // -> King, Knight
  }

  return { snapshot, movableAxis }
}

export default curry(computeSpecial)
