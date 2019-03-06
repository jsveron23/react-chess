import { SPECIALS } from '../constants'

/**
 * Get special
 * @param  {String} piece
 * @return {Array}
 */
function getSpecial (piece) {
  return SPECIALS[piece]
}

export default getSpecial
