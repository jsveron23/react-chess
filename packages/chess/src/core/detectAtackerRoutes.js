import { compose, curry, intersection, append, reject, includes } from 'ramda';
import computeFinalMT from './computeFinalMT';
import {
  parseCode,
  computeDistance,
  pretendAs,
  computeDistanceByTile,
} from '../utils';
import { Knight, Bishop, Rook, Pawn } from '../presets';

// 4 edges from diagonal moves
// => [1, 1] [1, 7] [7, 1] [7, 7]
// => compute this by `Math.abs`
// => e.g. [1, 7] - [7, 7] => -6, 0 => 6, 0
// => e.g. [7, 1] - [7, 7] => 0, -6 => 0, 6
// => e.g. [7, 1] - [1, 1] => 6, 0
// => e.g. [1, 7] - [1, 1] => 0, 6
const Rules = [
  [0, 6],
  [6, 0],
];

/**
 * Detect atacker routes
 * @param  {String} atkerCode
 * @param  {String} defenderCode
 * @param  {Array} timeline
 * @return {Array}
 */
function detectAtackerRoutes(atkerCode, defenderCode, timeline) {
  const { piece, fileName, rankName, tileName } = parseCode(atkerCode);
  const { file, rank } = computeDistance(atkerCode, defenderCode);
  const isDClose = file === 1 && rank === 1;
  const isVClose = file === 1 && rank === 0;
  const isHClose = file === 0 && rank === 1;

  if (isVClose || isHClose || isDClose) {
    return [tileName];
  }

  const aMt = computeFinalMT(atkerCode, timeline);
  let bMt = computeFinalMT(defenderCode, timeline);
  let routes = append(tileName, intersection(aMt, bMt));

  // NOTE specific condition, just recalculation
  if (!includes(piece, [Knight, Pawn])) {
    const { side: dSide, tileName: dTn } = parseCode(defenderCode);
    const isDiagonal = file === rank;
    const isVertical = rank > 0 && file === 0;
    const isHorizontal = file > 0 && rank === 0;
    const pretendBe = isDiagonal
      ? `${dSide}${Bishop}${dTn}`
      : `${dSide}${Rook}${dTn}`;

    defenderCode = pretendAs(defenderCode, pretendBe);
    bMt = computeFinalMT(defenderCode, timeline);
    routes = compose(
      append(tileName),
      reject((tN) => {
        if (isVertical) {
          return !tN.startsWith(fileName);
        } else if (isHorizontal) {
          return !tN.endsWith(rankName);
        } else if (isDiagonal) {
          const { file, rank } = computeDistanceByTile(tileName, tN);

          return includes([file, rank], Rules);
        }

        return false;
      }),
      intersection(aMt)
    )(bMt);
  }

  return routes;
}

export default curry(detectAtackerRoutes);
