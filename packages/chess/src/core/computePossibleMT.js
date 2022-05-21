import { curryN, compose, intersection, concat, without } from 'ramda';
import predictPossibleCheck from './predictPossibleCheck';
import getDodgeableTiles from './getDodgeableTiles';
import getCastlingTiles from './getCastlingTiles';
import getDiagonallyTiles from './getDiagonallyTiles';
import computeRawMT from './computeRawMT';
import getAttackerRoutes from './getAttackerRoutes';
import removePredictTiles from './internal/removePredictTiles';
import { detectPiece, pretendTo, computeDistance } from '../utils';

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
  const isKing = detectPiece.King(code);
  let mt = computeRawMT(timeline, code);

  // dodge or just movable tiles
  if (isKing) {
    mt = attackerCode
      ? getDodgeableTiles(timeline, attackerCode, code, attackerRoutes)
      : compose(concat(mt), getCastlingTiles(timeline))(code);

    return removePredictTiles(timeline, code, mt);
  }

  // block or capture
  if (attackerCode) {
    return intersection(mt, attackerRoutes);
  }

  // NOTE is my King safe even if I move to a tile?
  const predictAttacker = predictPossibleCheck(timeline, code);

  if (!predictAttacker) {
    // otherwise, just raw movable tiles
    return mt;
  }

  const {
    contact: isCloseAttacked,
    isVertical: isVerticalAttacked,
    isHorizontal: isHorizontalAttacked,
    isDiagonal: isDiagonalAttacked,
  } = computeDistance(predictAttacker, code);

  if (detectPiece.Pawn(code)) {
    const isNotDiagonalCloseAttacked = isDiagonalAttacked && !isCloseAttacked;
    const diagonalTile = getDiagonallyTiles(code, snapshot);

    if (isHorizontalAttacked || isNotDiagonalCloseAttacked) {
      return [];
    }

    if (isVerticalAttacked) {
      mt = without(diagonalTile, mt);
    }

    if (!isVerticalAttacked && isCloseAttacked) {
      mt = diagonalTile;
    }

    return mt;
  }

  return compose(
    intersection(mt),
    getAttackerRoutes(timeline, predictAttacker),
    pretendTo(code)
  )(predictAttacker);
}

export default curryN(4, computePossibleMT);
