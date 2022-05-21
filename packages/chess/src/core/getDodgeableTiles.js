import { curry, compose, intersection, without, concat } from 'ramda';
import computeRawMT from './computeRawMT';
import {
  detectPiece,
  filterOpponent,
  computeDistance,
  getSymmetryTile,
  convertSnapshotToTiles,
} from '../utils';

/**
 * Get dodgeable tiles
 * TODO for now, King only
 * @param  {Array}  timeline
 * @param  {String} attackerCode
 * @param  {String} defenderCode
 * @param  {Array}  attackerRoutes
 * @return {Array}
 */
function getDodgeableTiles(
  timeline,
  attackerCode,
  defenderCode,
  attackerRoutes
) {
  const [snapshot] = timeline;
  const { contact: isContacted, direction } = computeDistance(
    attackerCode,
    defenderCode
  );
  const isKing = detectPiece.King(defenderCode);
  const mt = computeRawMT(timeline, defenderCode);

  if (isKing && !isContacted) {
    const placedSideTiles = compose(
      convertSnapshotToTiles,
      filterOpponent(attackerCode)
    )(snapshot);
    const [removeTile] = intersection(mt, attackerRoutes);
    const symmetryTile = getSymmetryTile(direction, defenderCode, removeTile);
    const combinedTiles = concat(placedSideTiles, [removeTile, symmetryTile]);

    return without(combinedTiles, mt);
  }

  return mt;
}

export default curry(getDodgeableTiles);
