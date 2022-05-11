import { curry, compose, intersection, without, concat } from 'ramda';
import getAttackerRoutes from './getAttackerRoutes';
import computeRawMT from './computeRawMT';
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

  const isKing = detectPiece(King, defenderCode);
  const mt = computeRawMT(timeline, defenderCode);

  if (isKing && !contact) {
    // TODO check `predictPossibleCheck`
    const [removeTile] = intersection(mt, attackerRoutes);
    const symmetryTile = getSymmetryTile(direction, defenderCode, removeTile);

    return without(concat([removeTile], [symmetryTile]), mt);
  }

  return '';
}

export default curry(getDodgeableTiles);
