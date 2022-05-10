import {
  curry,
  compose,
  map,
  intersection,
  without,
  includes,
  filter,
  flatten,
  concat,
} from 'ramda';
import getAttackerRoutes from './getAttackerRoutes';
import computeFinalMT from './computeFinalMT';
import {
  pretendTo,
  detectPiece,
  computeDistance,
  convertAxisToTile,
} from '../utils';
import { King, Vertical, Horizontal } from '../presets';

// TODO for now, King only
function getDodgeableTiles(timeline, attackerCode, defenderCode) {
  const attackerRoutes = compose(
    getAttackerRoutes(timeline, attackerCode),
    pretendTo(defenderCode)
  )(attackerCode);

  // const isPawn = detectPiece(Pawn, defenderCode);
  const isKing = detectPiece(King, defenderCode);
  const mt = computeFinalMT(timeline, defenderCode);

  if (isKing) {
    const { contact, direction } = computeDistance(attackerCode, defenderCode);

    if (contact) {
      // TODO if contact, capture atker but need to detect protector
    } else {
      const convertToTile = convertAxisToTile(defenderCode);
      const removeTile = intersection(mt, attackerRoutes);
      let startX = [1, -1];
      let startY = [1, -1];

      if (direction === Vertical) {
        startX = [0];
        startY = [1, -1];
      } else if (direction === Horizontal) {
        startX = [1, -1];
        startY = [0];
      }

      const symmetryTile = compose(
        filter(Boolean),
        flatten,
        map((x) => {
          return map((y) => {
            const tileName = convertToTile([x, y]);

            // (x or y) - 1 => behind tile
            // remove behind tile also
            if (includes(tileName, attackerRoutes)) {
              return convertToTile([-x, -y]);
            }
          }, startY);
        })
      )(startX);

      return without(concat(removeTile, symmetryTile), mt);
    }
  }

  return '';
}

export default curry(getDodgeableTiles);
