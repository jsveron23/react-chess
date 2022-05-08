import { curry, reject, compose, equals, allPass, prop } from 'ramda';
import findAttacker from './findAttacker';
import { findCodeBy, detectTurn, detectPiece } from '../utils';
import { King } from '../presets';

/**
 * Compute predict Check code if code move
 * @param  {Array}  timeline
 * @param  {String} turn
 * @param  {String} code
 * @return {String}
 */
function computePredictCheck(timeline, turn, code) {
  const [snapshot, ...prevSnapshots] = timeline;
  const kingCode = findCodeBy(
    compose(allPass([detectTurn(turn), detectPiece(King)]), prop('code')),
    snapshot
  );
  const predictSnapshot = reject(equals(code), snapshot);

  return findAttacker(kingCode, [predictSnapshot, ...prevSnapshots]);
}

export default curry(computePredictCheck);
