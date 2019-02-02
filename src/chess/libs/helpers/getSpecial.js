import { SPECIALS } from '../../constants'

/**
 * Get special movements
 * @param  {string} piece
 * @return {Array}
 */
function getSpecial (piece) {
  return SPECIALS[piece]
}

export default getSpecial
