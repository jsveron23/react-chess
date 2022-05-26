import { curry, compose, intersection, without, concat, head } from 'ramda';
import computeRawMT from './computeRawMT';
import {
  detectPiece,
  filterOpponent,
  computeDistance,
  getDirection,
  detectContacted,
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
  const { file, rank } = computeDistance(attackerCode, defenderCode);
  const direction = getDirection(file, rank);
  const isContacted = detectContacted(file, rank);
  const isKing = detectPiece.King(defenderCode);
  const mt = computeRawMT(timeline, defenderCode);
  const placedSideTiles = compose(
    convertSnapshotToTiles,
    filterOpponent(attackerCode),
    head
  )(timeline);

  if (isKing && !isContacted) {
    const [removeTile] = intersection(mt, attackerRoutes);
    const symmetryTile = getSymmetryTile(direction, defenderCode, removeTile);

    return without(concat(placedSideTiles, [removeTile, symmetryTile]), mt);
  }

  return without(placedSideTiles, mt);
}

export default curry(getDodgeableTiles);
