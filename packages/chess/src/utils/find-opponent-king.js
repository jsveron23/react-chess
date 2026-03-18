import { curry, compose, head } from 'ramda';
import { getEqualPieces } from './get-equal-pieces';
import { filterOpponent } from './filter-opponent';
import { King } from '../presets';

/**
 * Find opponent King
 * @param  {String} opponentCode
 * @param  {Array}  snapshot
 * @return {String}
 */
function findOpponentKing(opponentCode, snapshot) {
  return compose(
    head,
    getEqualPieces(King),
    filterOpponent(opponentCode)
  )(snapshot);
}

const findOpponentKingCurried = curry(findOpponentKing);
export { findOpponentKingCurried as findOpponentKing };
