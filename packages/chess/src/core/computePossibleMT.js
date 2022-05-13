import { curryN, compose, intersection, isEmpty, concat, nth } from 'ramda';
import predictPossibleCheck from './predictPossibleCheck';
import getDodgeableTiles from './getDodgeableTiles';
import getCastlingTiles from './getCastlingTiles';
import computeRawMT from './computeRawMT';
import getAttackerRoutes from './getAttackerRoutes';
import removePredictTiles from './internal/removePredictTiles';
import { detectPiece, parseCode, findOpponentKing, pretendTo } from '../utils';
import { King } from '../presets';

/**
 * Compute possible movable tiles (entry function)
 * @param  {String} [attackerCode='']
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
  const isKing = detectPiece(King, code);
  const _removePredict = removePredictTiles(timeline);
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

  // NOTE if move this piece, it would be Check state?
  // otherwise, free to move
  const predictAttacker = predictPossibleCheck(timeline, code);

  if (predictAttacker) {
    const { tileName } = parseCode(predictAttacker);
    const kingCode = compose(
      findOpponentKing(predictAttacker),
      nth(0)
    )(timeline);
    const captureRoutes = compose(
      intersection(mt),
      getAttackerRoutes(timeline, predictAttacker),
      pretendTo(kingCode)
    )(predictAttacker);

    mt = !isEmpty(captureRoutes) ? [tileName, ...captureRoutes] : [];
  }

  return _removePredict(code, mt);
}

export default curryN(4, computePossibleMT);
