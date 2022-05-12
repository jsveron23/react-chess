import { curry, compose, intersection, without, concat, nth } from 'ramda';
import computeRawMT from './computeRawMT';
import {
  detectPiece,
  filterOpponent,
  computeDistance,
  getSymmetryTile,
  convertSnapshotToTiles,
} from '../utils';
import { King } from '../presets';

// TODO for now, King only
function getDodgeableTiles(
  timeline,
  attackerCode,
  defenderCode,
  attackerRoutes
) {
  const { contact: isContacted, direction } = computeDistance(
    attackerCode,
    defenderCode
  );
  const isKing = detectPiece(King, defenderCode);
  const mt = computeRawMT(timeline, defenderCode);

  if (isKing && !isContacted) {
    const placedSideTiles = compose(
      convertSnapshotToTiles,
      filterOpponent(attackerCode),
      nth(0)
    )(timeline);
    const [removeTile] = intersection(mt, attackerRoutes);
    const symmetryTile = getSymmetryTile(direction, defenderCode, removeTile);

    return without(concat(placedSideTiles, [removeTile, symmetryTile]), mt);
  }

  return mt;
}

export default curry(getDodgeableTiles);
