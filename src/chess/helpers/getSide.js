import { SIDE } from '~/chess/constants'

/**
 * Get side
 * @param  {string} key
 * @return {string}
 */
function getSide (key) {
  return SIDE[key]
}

export default getSide
