import { MOVEMENTS } from '../constants'

/**
 * Get piece movement
 * @param  {String} piece uppercase
 * @return {Array}
 */
function getMovement (piece) {
  return MOVEMENTS[piece]
}

export default getMovement
