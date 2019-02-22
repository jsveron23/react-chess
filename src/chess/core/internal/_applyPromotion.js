import { curry } from 'ramda'
import { replaceSnapshot } from '~/chess/helpers'

const PROMOTION = 'promotion'
const PROMOTION_TILES = {
  w: ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
  b: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
}

function _applyPromotion (side, tile, special, snapshot) {
  const isMovedToEnd = PROMOTION_TILES[side].includes(tile)
  const shouldPromotion = special.includes(PROMOTION) && isMovedToEnd
  let nextSnapshot = []

  if (shouldPromotion) {
    nextSnapshot = replaceSnapshot(`${side}Q${tile}`, tile, snapshot)
  }

  return nextSnapshot
}

export default curry(_applyPromotion)
