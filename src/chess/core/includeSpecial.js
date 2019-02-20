import { curry, includes } from 'ramda'
import { isExist } from '~/utils'
import {
  isCodeExist,
  replaceSnapshot,
  convertTileToAxis,
  findCodeByAxis
} from '~/chess/helpers'

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
function includeSpecial (side, special, tile, snapshot, movableAxis) {
  if (special.length > 1) {
    // -> Pawn
    const { x, y } = convertTileToAxis(tile)

    // ----------------
    // before rendering (append movable axis)
    // ----------------
    const diagonalRightAxis = side === 'w' ? [x + 1, y + 1] : [x - 1, y - 1]
    const diagonalLeftAxis = side === 'w' ? [x - 1, y + 1] : [x + 1, y - 1]
    const findCapturableTile = findCodeByAxis(snapshot)
    const diagonalRightTile = findCapturableTile(diagonalRightAxis)
    const diagonalLeftTile = findCapturableTile(diagonalLeftAxis)
    const enPassantAxis = [
      ...[isExist(diagonalRightTile) ? diagonalRightAxis : []],
      ...[isExist(diagonalLeftTile) ? diagonalLeftAxis : []]
    ]

    const isFirstMove = includes(tile, DOUBLE_STEP_TILES[side])
    const isDoubleStep = includes(DOUBLE_STEP, special) && isFirstMove
    let nextMovableAxis = [...movableAxis]

    // TODO: optimize
    if (isDoubleStep && isExist(movableAxis)) {
      const [firstAxis] = movableAxis
      const isFirstTileBlocked = isCodeExist(snapshot, firstAxis)

      const nextY = side === 'w' ? y + 2 : y - 2
      const nextAxis = [x, nextY]
      const isNextTileBlocked = isCodeExist(snapshot, nextAxis)

      nextMovableAxis = [...movableAxis, nextAxis]

      if (isFirstTileBlocked) {
        nextMovableAxis = []
      }

      if (isNextTileBlocked) {
        nextMovableAxis = [...movableAxis]
      }
    }

    nextMovableAxis = [...nextMovableAxis, ...enPassantAxis].filter(isExist)

    if (isExist(movableAxis)) {
      return { snapshot, movableAxis: nextMovableAxis }
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

export default curry(includeSpecial)
