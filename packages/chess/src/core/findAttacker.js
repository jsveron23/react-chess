import { curry, compose, find, nth } from 'ramda';
import computeRawMT from './computeRawMT';
import {
  filterOpponent,
  parseCode,
  detectTileOn,
  detectPiece,
  removeDirection,
} from '../utils';
import { Pawn, Vertical } from '../presets';

/**
 * Find which piece is attacker to `code`
 * @param  {String} defenderCode
 * @param  {Array}  timeline
 * @return {String}
 */
function findAttacker(defenderCode, timeline) {
  const { tileName } = parseCode(defenderCode);
  const computeMT = computeRawMT(timeline);

  return compose(
    find((code) => {
      const isPawn = detectPiece(Pawn, code);
      let mt = computeMT(code);

      if (isPawn) {
        // if Pawn in vertical tiles of `defenderCode`,
        // remove vertical tiles
        // - cannot attack by vertical direction
        mt = removeDirection(Vertical, mt, code);
      }

      return detectTileOn(tileName, mt);
    }),
    filterOpponent(defenderCode),
    nth(0)
  )(timeline);
}

export default curry(findAttacker);
