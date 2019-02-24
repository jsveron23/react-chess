import { curry } from 'ramda'

const PROMOTION = 'promotion'
const PROMOTION_TILES = {
  w: ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
  b: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
}

/**
 * @param  {string} side
 * @param  {string} tile
 * @param  {Array}  special
 * @return {Array}
 */
function _applyPromotion (side, tile, special) {
  const isMovedToEnd = PROMOTION_TILES[side].includes(tile)
  const shouldPromotion = special.includes(PROMOTION) && isMovedToEnd

  return shouldPromotion ? `${side}Q${tile}` : ''
}

export default curry(_applyPromotion)
