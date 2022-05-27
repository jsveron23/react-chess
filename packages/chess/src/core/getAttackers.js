import { curry, compose, filter, head, includes } from 'ramda';
import computeRawMT from './computeRawMT';
import {
  filterOpponent,
  parseCode,
  detectPiece,
  removeDirection,
} from '../utils';

/**
 * Get which pieces are attackers
 * @param  {String} defenderCode
 * @param  {Array}  timeline
 * @return {String}
 */
function getAttackers(defenderCode, timeline) {
  const _includesTn = compose(
    includes,
    parseCode.prop('tileName')
  )(defenderCode);

  return compose(
    filter((code) => {
      let mt = computeRawMT(timeline, code);

      if (detectPiece.Pawn(code)) {
        mt = removeDirection.Vertical(mt, code);
      }

      return _includesTn(mt);
    }),
    filterOpponent(defenderCode),
    head
  )(timeline);
}

export default curry(getAttackers);
