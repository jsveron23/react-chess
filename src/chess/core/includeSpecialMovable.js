import { curry } from 'ramda'
import { transformXY, parseTileName } from '~/chess/helpers'

const DOUBLE_STEP = 'doubleStep'
const DOUBLE_STEP_TILES = {
  w: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
  b: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7']
}

/**
 * Include special movable
 * @param  {string} piece
 * @param  {string} side
 * @param  {Array}  special
 * @param  {string} tile
 * @param  {Array}  movable
 * @return {Array}
 */
function includeSpecialMovable (piece, side, special, tile, movable) {
  const len = special.length

  if (len > 1) {
    // -> Pawn
    const isPawn = special.includes(DOUBLE_STEP)
    const isFirstMove = DOUBLE_STEP_TILES[side].includes(tile)
    const isDoubleStep = isPawn && isFirstMove

    if (isDoubleStep) {
      const { y } = transformXY(tile)
      const nextY = side === 'w' ? y + 2 : y - 2
      const { fileName } = parseTileName(tile)

      return [...movable, `${fileName}${nextY}`]
    }
  } else {
    // -> King, Knight
  }

  return movable
}

export default curry(includeSpecialMovable)
