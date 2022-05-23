import { curry, compose, find, nth, includes } from 'ramda';
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
  const _includesTn = compose(
    includes,
    parseCode.prop('tileName')
  )(defenderCode);

  return compose(
    find((code) => {
      let mt = _computeMT(code);

      if (detectPiece.Pawn(code)) {
        // if Pawn in vertical tiles of `defenderCode`,
        // remove vertical tiles
        // - cannot attack by vertical direction
        mt = removeDirection.Vertical(mt, code);
      }

      return _includesTn(mt);
    }),
    filterOpponent(defenderCode),
    nth(0)
  )(timeline);
}

export default curry(findAttacker);
