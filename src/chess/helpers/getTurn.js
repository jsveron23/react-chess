import { TURN } from '../constants'

/**
 * Get turn (short name -> full name)
 * @param  {String} side
 * @return {String}
 */
function getTurn (side) {
  return TURN[side]
}

export default getTurn
