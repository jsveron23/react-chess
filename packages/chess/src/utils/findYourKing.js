import { curry, compose, nth } from 'ramda';
import getEqualPieces from './getEqualPieces';
import filterOpponent from './filterOpponent';
import { King } from '../presets';

function findYourKing(opponentCode, timeline) {
  return compose(
    nth(0),
    getEqualPieces(King),
    filterOpponent(opponentCode),
    nth(0)
  )(timeline);
}

export default curry(findYourKing);
