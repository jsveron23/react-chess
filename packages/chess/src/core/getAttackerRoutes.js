import { compose, curry, intersection, append, reject, includes } from 'ramda';
import computeFinalMT from './computeFinalMT';
import {
  parseCode,
  computeDistance,
  transformInto,
  convertAxisListToTiles,
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
 * Get attacker routes
 * @param  {Array}  timeline
 * @param  {String} atkerCode
 * @param  {String} defenderCode
 * @return {Array}
 */
function getAttackerRoutes(timeline, atkerCode, defenderCode) {
  const { piece, fileName, rankName, tileName } = parseCode(atkerCode);
  const {
    file: fileDistance,
    rank: rankDistance,
    direction,
    contact,
  } = computeDistance(atkerCode, defenderCode);

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
            const mirrorTiles = convertAxisListToTiles(defenderCode, [
              [fileDistance, rankDistance],
              [-fileDistance, rankDistance],
              [fileDistance, -rankDistance],
              [-fileDistance, -rankDistance],
            ]);

            return includes(tN, mirrorTiles);
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

export default curry(getAttackerRoutes);
