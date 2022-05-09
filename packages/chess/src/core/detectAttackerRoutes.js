import { compose, curry, intersection, append, reject, includes } from 'ramda';
import computeFinalMT from './computeFinalMT';
import {
  parseCode,
  computeDistance,
  transformInto,
  computeDistanceByTile,
} from '../utils';
import {
  Knight,
  Bishop,
  Rook,
  Pawn,
  Diagonal,
  Vertical,
  Horizontal,
} from '../presets';

/**
 * Detect attacker routes
 * @param  {Array}  timeline
 * @param  {String} atkerCode
 * @param  {String} defenderCode
 * @return {Array}
 */
function detectAttackerRoutes(timeline, atkerCode, defenderCode) {
  const { piece, fileName, rankName, tileName } = parseCode(atkerCode);
  const { direction, contact } = computeDistance(atkerCode, defenderCode);

  if (contact) {
    return [tileName];
  }

  const aMt = computeFinalMT(timeline, atkerCode);
  let bMt = computeFinalMT(timeline, defenderCode);
  let routes = intersection(aMt, bMt);

  // NOTE specific condition, just recalculation
  // its because of remove another direction
  // eg, if Rook attack by Vertical direction then remove Horizontal
  if (!includes(piece, [Knight, Pawn])) {
    routes = compose(
      reject((tN) => {
        // extra tiles deletion, not direction
        switch (direction) {
          case Vertical: {
            return !tN.startsWith(fileName);
          }

          case Horizontal: {
            return !tN.endsWith(rankName);
          }

          case Diagonal: {
            // 4 edges from diagonal moves (index)
            // => [1, 1] [1, 7] [7, 1] [7, 7]
            // => compute those by `Math.abs`
            // => eg, [1, 1] - [7, 7] => [-6, -6] => [6, 6]
            // => eg, [1, 7] - [7, 7] => [-6, 0] => [6, 0]
            // => eg, [7, 1] - [7, 7] => [0, -6] => [0, 6]
            // => eg, [7, 1] - [1, 1] => [6, 0]
            // => eg, [1, 7] - [1, 1] => [0, 6]
            // => eg, [1, 7] - [1, 1] => [0, 6]
            // prettier-ignore
            const Rules = [[0, 6], [6, 0], [6, 6]];
            const { file, rank } = computeDistanceByTile(tileName, tN);

            return includes([file, rank], Rules);
          }

          default: {
            return false;
          }
        }
      }),
      intersection(aMt),
      computeFinalMT(timeline)
    )(
      direction === Diagonal
        ? transformInto(Bishop, defenderCode)
        : transformInto(Rook, defenderCode)
    );
  }

  return append(tileName, routes);
}

export default curry(detectAttackerRoutes);
