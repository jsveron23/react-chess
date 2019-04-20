import * as R from 'ramda'
import { TURN } from '../constants'

/**
 * Get turn (short name -> full name)
 * @param  {String} side
 * @return {String}
 */
function getTurn (side) {
  return R.defaultTo('', TURN[side])
}

export default getTurn
