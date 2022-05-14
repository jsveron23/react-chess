import { curry, compose, nth } from 'ramda';
import getEqualPieces from './getEqualPieces';
import filterOpponent from './filterOpponent';
import { King } from '../presets';

/**
 * Find opponent King
 * @param  {String} opponentCode
 * @param  {Array}  snapshot
 * @return {String}
 */
function findOpponentKing(opponentCode, snapshot) {
  return compose(
    nth(0),
    getEqualPieces(King),
    filterOpponent(opponentCode)
  )(snapshot);
}

export default curry(findOpponentKing);
