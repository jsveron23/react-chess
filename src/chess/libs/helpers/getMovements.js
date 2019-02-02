import { MOVEMENTS } from '../../constants'

/**
 * Get movements
 * @param  {string} piece
 * @return {Array}
 */
function getMovements (piece) {
  return MOVEMENTS[piece]
}

export default getMovements
