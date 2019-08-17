import * as R from 'ramda'
import { OPPONENT } from '../constants'

/**
 * Get opponent turn
 * @param  {String} turn
 * @return {String}
 */
function getOpponentTurn (turn) {
  return R.compose(
    R.defaultTo(''),
    R.prop(turn)
  )(OPPONENT)
}

export default getOpponentTurn
