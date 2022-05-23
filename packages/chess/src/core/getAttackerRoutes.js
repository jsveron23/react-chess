import { compose, curry, intersection, append, reject, includes } from 'ramda';
import computeRawMT from './computeRawMT';
import {
  parseCode,
  computeDistance,
  detectContacted,
  transformInto,
  getDirection,
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
 * @param  {String} attackerCode
 * @param  {String} defenderCode
 * @return {Array}
 */
function getAttackerRoutes(timeline, attackerCode, defenderCode) {
  const { piece, fileName, rankName, tileName } = parseCode(attackerCode);
  const { file, rank } = computeDistance(attackerCode, defenderCode);
  const direction = getDirection(file, rank);
  const isContacted = detectContacted(file, rank);

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
        switch (direction) {
          case Vertical: {
            return !tN.startsWith(fileName);
          }

          case Horizontal: {
            return !tN.endsWith(rankName);
          }

          case Diagonal: {
            const mirrorTiles = convertAxisListToTiles(defenderCode, [
              [file, rank],
              [-file, rank],
              [file, -rank],
              [-file, -rank],
            ]);

            return includes(tN, mirrorTiles);
          }

          default: {
            return false;
          }
        }
      }),
      intersection(aMt),
      _computeMT
    )(
      direction === Diagonal
        ? transformInto(Bishop, defenderCode)
        : transformInto(Rook, defenderCode)
    );
  }

  return append(tileName, routes);
}

export default curry(getAttackerRoutes);
