import { curry, reject, equals } from 'ramda';
import findAttacker from './findAttacker';
import { findCodeBy, detectTurn, detectPiece } from '../utils';
import { King } from '../presets';

function computePredictCheck(timeline, turn, code) {
  const [snapshot, ...prevSnapshots] = timeline;
  const kingCode = findCodeBy(({ code: cd }) => {
    return detectTurn(turn, cd) && detectPiece(King, cd);
  }, snapshot);
  const predictSnapshot = reject(equals(code), snapshot);

  return findAttacker(kingCode, [predictSnapshot, ...prevSnapshots]);
}

export default curry(computePredictCheck);
