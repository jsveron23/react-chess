import { curry } from 'ramda'
import { transformXY, parseTileName, replaceLineup } from '~/chess/helpers'
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
 * Include special (lineup or movable)
 * @param  {string} side
 * @param  {Array}  special
 * @param  {string} tile
 * @param  {Array?} movable
 * @param  {Array?} lineup
 * @return {Object}
 *  - lineup -> after moving
 *  - movable -> before rendering
 */
function computeSpecial (side, special, tile, movable, lineup) {
  const len = special.length

  if (len > 1) {
    // -> Pawn

    // ----------------
    // before rendering (to display extended movable)
    // ----------------
    const isFirstMove = DOUBLE_STEP_TILES[side].includes(tile)
    const isDoubleStep = special.includes(DOUBLE_STEP) && isFirstMove

    if (isDoubleStep && isExist(movable)) {
      const { y } = transformXY(tile)
      const nextY = side === 'w' ? y + 2 : y - 2
      const { file } = parseTileName(tile)

      return { lineup, movable: [...movable, `${file}${nextY}`] }
    }

    // ----------------
    // after moving (to transform as Queen)
    // ----------------
    const isMoveToEnd = PROMOTION_TILES[side].includes(tile)
    const isPromotion = special.includes(PROMOTION) && isMoveToEnd

    if (isPromotion && isExist(lineup)) {
      const nextLineup = replaceLineup(side, 'Q', tile, lineup)

      return { lineup: nextLineup, movable }
    }
  } else {
    // -> King, Knight
  }

  return { movable, lineup }
}

export default curry(computeSpecial)
