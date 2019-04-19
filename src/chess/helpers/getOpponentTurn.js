import { OPPONENT } from '../constants'

/**
 * Get opponent turn
 * @param  {String} turn
 * @return {String}
 */
function getOpponentTurn (turn) {
  return OPPONENT[turn]
}

export default getOpponentTurn
