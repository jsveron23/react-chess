import { curry, compose, find } from 'ramda';
import computeFinalMT from './computeFinalMT';
import {
  filterOpponent,
  parseCode,
  detectTileOTW,
  detectPiece,
  removeDirection,
} from '../utils';
import { Pawn, Vertical } from '../presets';

/**
 * Find attacker
 * @param  {String} code
 * @param  {Array}  timeline
 * @return {String}
 */
function findAttacker(code, timeline) {
  const { tileName } = parseCode(code);
  const [snapshot] = timeline;

  return compose(
    find((cd) => {
      // if Pawn front from code,
      // remove vertical tiles (cannot attack by vertical way)
      const isPawn = detectPiece(Pawn, cd);
      let mt = computeFinalMT(cd, timeline);

      if (isPawn) {
        mt = removeDirection(Vertical, mt, cd);
      }

      return detectTileOTW(tileName, mt);
    }),
    filterOpponent(code)
  )(snapshot);
}

export default curry(findAttacker);
