import {
  curryN,
  compose,
  intersection,
  concat,
  without,
  juxt,
  props,
  apply,
  reject,
  equals,
  tail,
} from 'ramda';
import predictPossibleCheck from './predictPossibleCheck';
import getDodgeableTiles from './getDodgeableTiles';
import getCastlingTiles from './getCastlingTiles';
import getDiagonallyTiles from './getDiagonallyTiles';
import computeRawMT from './computeRawMT';
import getAttackerRoutes from './getAttackerRoutes';
import removePredictTiles from './internal/removePredictTiles';
import {
  detectPiece,
  parseCode,
  getDirection,
  computeDistance,
  detectContacted,
} from '../utils';
import { King, Vertical, Horizontal, Diagonal } from '../presets';

/**
 * Compute possible movable tiles (entry function)
 * @param  {String} [attackerCode=''] in Check state
 * @param  {Array}  [attackerRoutes=[]]
 * @param  {String} code
 * @param  {Array}  timeline
 * @return {Array}
 */
function computePossibleMT(
  attackerCode = '',
  attackerRoutes = [],
  code,
  timeline
) {
  const [snapshot] = timeline;
  let mt = computeRawMT(timeline, code);

  // dodge or just movable tiles
  if (detectPiece.King(code)) {
    mt = attackerCode
      ? getDodgeableTiles(timeline, attackerCode, code, attackerRoutes)
      : compose(concat(mt), getCastlingTiles(timeline))(code);

    return removePredictTiles(timeline, code, mt);
  }

  if (attackerCode) {
    return intersection(mt, attackerRoutes);
  }

  // NOTE is my King safe even if I move to a tile?
  const predictAttacker = predictPossibleCheck(timeline, code);

  if (predictAttacker) {
    if (detectPiece.Pawn(code)) {
      const [direction, isContacted] = compose(
        juxt([apply(getDirection), apply(detectContacted)]),
        props(['file', 'rank']),
        computeDistance(predictAttacker)
      )(code);
      const isByVertical = direction === Vertical;
      const isByHorizontal = direction === Horizontal;
      const isByDiagonal = direction === Diagonal;

      if (isByHorizontal || (isByDiagonal && !isContacted)) {
        return [];
      }

      const diagonalTile = getDiagonallyTiles(code, snapshot);

      if (isByVertical) {
        mt = without(diagonalTile, mt);
      } else if (!isByVertical && isContacted) {
        mt = diagonalTile;
      }

      return mt;
    } else if (detectPiece.Knight(code)) {
      return [];
    }

    const { side, tileName } = parseCode(code);
    const predictSnapshot = reject(equals(code), snapshot);
    const kingCode = snapshot.find(parseCode.eq(['pKey', `${side}${King}`]));

    return compose(
      without(tileName),
      getAttackerRoutes([predictSnapshot, ...tail(timeline)], predictAttacker)
    )(kingCode);
  }

  return mt;
}

export default curryN(4, computePossibleMT);
