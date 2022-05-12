import { curryN, compose, intersection, isEmpty } from 'ramda';
import predictPossibleCheck from './predictPossibleCheck';
import getDodgeableTiles from './getDodgeableTiles';
import computeRawMT from './computeRawMT';
import getAttackerRoutes from './getAttackerRoutes';
import removePredictTiles from './removePredictTiles';
import { detectPiece, parseCode, findOpponentKing, pretendTo } from '../utils';
import { King } from '../presets';

function computePossibleMT(
  attackerCode = '',
  attackerRoutes = [],
  code,
  timeline
) {
  const isKing = detectPiece(King, code);
  let mt = computeRawMT(timeline, code);

  // Check state
  if (attackerCode) {
    if (isKing) {
      mt = getDodgeableTiles(timeline, attackerCode, code, attackerRoutes);
    } else {
      // block or capture
      mt = intersection(mt, attackerRoutes);
    }
  } else {
    // NOTE if move this piece, it would be Check state?
    // otherwise, free to move
    const predictAttacker = predictPossibleCheck(timeline, code);

    if (predictAttacker) {
      const kingCode = findOpponentKing(predictAttacker, timeline);
      const captureRoutes = compose(
        intersection(mt),
        getAttackerRoutes(timeline, predictAttacker),
        pretendTo(kingCode)
      )(predictAttacker);
      const { tileName } = parseCode(predictAttacker);

      mt = !isEmpty(captureRoutes) ? [tileName, ...captureRoutes] : [];
    }
  }

  return removePredictTiles(timeline, code, mt);
}

export default curryN(4, computePossibleMT);
