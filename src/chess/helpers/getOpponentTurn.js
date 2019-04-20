import * as R from 'ramda'
import { OPPONENT } from '../constants'

/**
 * Get opponent turn
 * @param  {String} turn
 * @return {String}
 */
function getOpponentTurn (turn) {
  return R.defaultTo('', OPPONENT[turn])
}

export default getOpponentTurn
