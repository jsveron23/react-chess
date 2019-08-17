import * as R from 'ramda'
import { MOVEMENTS } from '../constants'

/**
 * Get piece movement
 * @param  {String} piece uppercase
 * @return {Array}
 */
function getMovement (piece) {
  return R.compose(
    R.defaultTo([]),
    R.prop(piece)
  )(MOVEMENTS)
}

export default getMovement
