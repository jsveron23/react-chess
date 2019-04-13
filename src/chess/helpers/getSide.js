import { SIDE } from '../constants'

/**
 * Get side
 * TODO: getTurn > long words | getSide > short words
 * @param  {String} side
 * @return {String}
 */
function getSide (side) {
  return SIDE[side]
}

export default getSide
