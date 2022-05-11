import { curry, compose, intersection, without, concat } from 'ramda';
import getAttackerRoutes from './getAttackerRoutes';
import computeFinalMT from './computeFinalMT';
import getSymmetryTile from './getSymmetryTile';
import { pretendTo, detectPiece, computeDistance } from '../utils';
import { King } from '../presets';

// TODO for now, King only
function getDodgeableTiles(timeline, attackerCode, defenderCode) {
  const { contact, direction } = computeDistance(attackerCode, defenderCode);
  const attackerRoutes = compose(
    getAttackerRoutes(timeline, attackerCode),
    pretendTo(defenderCode)
  )(attackerCode);

  // const isPawn = detectPiece(Pawn, defenderCode);
  const isKing = detectPiece(King, defenderCode);
  const mt = computeFinalMT(timeline, defenderCode);

  if (isKing) {
    if (contact) {
      // TODO if contact, capture atker but need to detect protector
    } else {
      const [removeTile] = intersection(mt, attackerRoutes);
      const symmetryTile = getSymmetryTile(direction, defenderCode, removeTile);

      return without(concat([removeTile], symmetryTile), mt);
    }
  }

  return '';
}

export default curry(getDodgeableTiles);
