import { curry, compose, filter, prop, includes } from 'ramda';
import computeRawMT from './computeRawMT';
import {
  filterOpponent,
  parseCode,
  detectPiece,
  removeDirection,
} from '../utils';

const _detectDefenderIn = compose(includes, prop('tileName'), parseCode);

/**
 * Find attacker pieces
 * TODO mostly, just one attacker. but when Pawn promote to Queen, can be two attackers
 * @param  {String} defenderCode
 * @param  {Array}  timeline
 * @return {String}
 */
function findAttackers(defenderCode, timeline) {
  const [snapshot] = timeline;
  const _computeMT = computeRawMT(timeline);
  const _detectDefender = _detectDefenderIn(defenderCode);

  return compose(
    filter((code) => {
      let mt = _computeMT(code);

      if (detectPiece.Pawn(code)) {
        mt = removeDirection.Vertical(mt, code);
      }

      return _detectDefender(mt);
    }),
    filterOpponent(defenderCode)
  )(snapshot);
}

export default curry(findAttackers);
