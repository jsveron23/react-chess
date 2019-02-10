import { SPECIALS } from '~/chess/constants'

/**
 * Get special
 * @param  {string} piece
 * @return {Array}
 */
function getSpecial (piece) {
  return SPECIALS[piece]
}

export default getSpecial
