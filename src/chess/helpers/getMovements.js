import { MOVEMENTS } from '~/chess/constants'

/**
 * Get piece movements
 * @param  {string} piece uppercase
 * @return {Array}
 */
function getMovements (piece) {
  return MOVEMENTS[piece]
}

export default getMovements
