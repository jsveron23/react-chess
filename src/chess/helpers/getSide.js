import { SIDE } from '~/chess/constants'

/**
 * Get side
 * @param  {string} side
 * @return {string}
 */
function getSide (side) {
  return SIDE[side]
}

export default getSide
