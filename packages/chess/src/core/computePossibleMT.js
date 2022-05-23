import { curryN, compose, intersection, concat, without } from 'ramda';
import predictPossibleCheck from './predictPossibleCheck';
import getDodgeableTiles from './getDodgeableTiles';
import getCastlingTiles from './getCastlingTiles';
import getDiagonallyTiles from './getDiagonallyTiles';
import computeRawMT from './computeRawMT';
import getAttackerRoutes from './getAttackerRoutes';
import removePredictTiles from './internal/removePredictTiles';
import {
  detectPiece,
  pretendTo,
  getDirection,
  computeDistance,
  detectContacted,
} from '../utils';
import { King, Pawn, Vertical, Horizontal, Diagonal } from '../presets';

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
  const isKing = detectPiece(King, code);
  const _removePredict = removePredictTiles(timeline);
  const _getAttackerRoutes = getAttackerRoutes(timeline);
  let mt = computeRawMT(timeline, code);

  // dodge or just movable tiles
  if (isKing) {
    mt = attackerCode
      ? getDodgeableTiles(timeline, attackerCode, code, attackerRoutes)
      : compose(concat(mt), getCastlingTiles(timeline))(code);

    return _removePredict(code, mt);
  }

  // block or capture
  if (attackerCode) {
    return intersection(mt, attackerRoutes);
  }

  // NOTE is my King safe even if I move to a tile?
  const predictAttacker = predictPossibleCheck(timeline, code);

  if (predictAttacker) {
    if (detectPiece(Pawn, code)) {
      const { file, rank } = computeDistance(predictAttacker, code);
      const direction = getDirection(file, rank);
      const isContacted = detectContacted(file, rank);
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
    }

    const possibleAttackRoutes = compose(
      intersection(mt),
      _getAttackerRoutes(predictAttacker),
      pretendTo(code)
    )(predictAttacker);

    return intersection(possibleAttackRoutes, mt);
  }

  return mt;
}

export default curryN(4, computePossibleMT);
