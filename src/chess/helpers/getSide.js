import * as R from 'ramda'
import { SIDE } from '../constants'

/**
 * Get side (full name -> short name)
 * @param  {String} turn
 * @return {String}
 */
function getSide (turn) {
  return R.compose(
    R.defaultTo(''),
    R.prop(turn)
  )(SIDE)
}

export default getSide
