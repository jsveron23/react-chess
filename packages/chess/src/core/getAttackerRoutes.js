import { compose, curry, intersection, append, reject, includes } from 'ramda';
import computeRawMT from './computeRawMT';
import {
  parseCode,
  computeDistance,
  transformInto,
  convertAxisListToTiles,
} from '../utils';
import { Knight, Bishop, Rook, Pawn } from '../presets';

/**
 * Get attacker routes
 * @param  {Array}  timeline
 * @param  {String} attackerCode
 * @param  {String} defenderCode
 * @return {Array}
 */
function getAttackerRoutes(timeline, attackerCode, defenderCode) {
  const { piece, fileName, rankName, tileName } = parseCode(attackerCode);
  const {
    file: fileDistance,
    rank: rankDistance,
    contact: isContacted,
    isVertical,
    isHorizontal,
    isDiagonal,
  } = computeDistance(attackerCode, defenderCode);
  const mirrorAxisList = [
    [fileDistance, rankDistance],
    [-fileDistance, rankDistance],
    [fileDistance, -rankDistance],
    [-fileDistance, -rankDistance],
  ];
  const pretendDirectionalCode = isDiagonal
    ? transformInto(Bishop, defenderCode)
    : transformInto(Rook, defenderCode);

  if (isContacted) {
    return [tileName];
  }

  const _computeMT = computeRawMT(timeline);
  const aMt = _computeMT(attackerCode);
  let bMt = _computeMT(defenderCode);
  let routes = intersection(aMt, bMt);

  // NOTE specific condition, just recalculation
  // its because of remove another direction
  // eg, if Rook attack by Vertical direction then remove Horizontal
  if (!includes(piece, [Knight, Pawn])) {
    routes = compose(
      reject((tN) => {
        // extra tiles deletion, not direction
        if (isVertical) {
          return !tN.startsWith(fileName);
        } else if (isHorizontal) {
          return !tN.endsWith(rankName);
        } else if (isDiagonal) {
          return compose(
            includes(tN),
            convertAxisListToTiles(defenderCode)
          )(mirrorAxisList);
        }

        return false;
      }),
      intersection(aMt),
      _computeMT
    )(pretendDirectionalCode);
  }

  return append(tileName, routes);
}

export default curry(getAttackerRoutes);
