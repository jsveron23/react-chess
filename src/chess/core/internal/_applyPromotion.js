import * as R from 'ramda'

const PROMOTION = 'promotion'
const PROMOTION_TILES = {
  w: ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
  b: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
}

/**
 * TODO: bug: when capture on end of tile
 * @param  {String} side
 * @param  {String} tile
 * @param  {Array}  special
 * @return {Array}
 */
function _applyPromotion (side, tile, special) {
  const isPromotion = R.compose(
    R.and(special.includes(PROMOTION)),
    R.includes(tile)
  )(PROMOTION_TILES[side])

  return isPromotion ? `${side}Q${tile}` : ''
}

export default R.curry(_applyPromotion)
