import { MOVEMENTS } from '~/chess/constants'

/**
 * Get piece movement
 * @param  {string} piece uppercase
 * @return {Array}
 */
function getMovement (piece) {
  return MOVEMENTS[piece]
}

export default getMovement
