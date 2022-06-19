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
 * @return {Array}
 */
function getAttackers(defenderCode, timeline) {
  return compose(
    filter((code) => {
      let mt = computeRawMT(timeline, code);

      if (detectPiece.Pawn(code)) {
        mt = removeDirection.Vertical(mt, code);
      }

      return includes(parseCode.prop('tileName', defenderCode), mt);
    }),
    filterOpponent(defenderCode),
    head
  )(timeline);
}

export default curry(getAttackers);
