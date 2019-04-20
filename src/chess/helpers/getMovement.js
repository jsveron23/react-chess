import * as R from 'ramda'
import { MOVEMENTS } from '../constants'

/**
 * Get piece movement
 * @param  {String} piece uppercase
 * @return {Array}
 */
function getMovement (piece) {
  return R.defaultTo([], MOVEMENTS[piece])
}

export default getMovement
