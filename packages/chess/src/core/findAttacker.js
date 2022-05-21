import { curry, compose, find, prop, nth, includes } from 'ramda';
import computeRawMT from './computeRawMT';
import {
  filterOpponent,
  parseCode,
  detectPiece,
  removeDirection,
} from '../utils';

/**
 * Find which piece is attacker to `code`
 * @param  {String} defenderCode
 * @param  {Array}  timeline
 * @return {String}
 */
function findAttacker(defenderCode, timeline) {
  const _computeMT = computeRawMT(timeline);
  const _includesDefenderTile = compose(
    includes,
    prop('tileName'),
    parseCode
  )(defenderCode);

  // TODO multiple attackers
  return compose(
    find((code) => {
      const isPawn = detectPiece.Pawn(code);
      let mt = _computeMT(code);

      if (isPawn) {
        mt = removeDirection.Vertical(mt, code);
      }

      return _includesDefenderTile(mt);
    }),
    filterOpponent(defenderCode),
    nth(0)
  )(timeline);
}

export default curry(findAttacker);
