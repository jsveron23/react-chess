import { curry, reject, compose, equals, prop, find } from 'ramda';
import findAttacker from './findAttacker';
import { replaceCode, parseCode, detectPiece } from '../utils';
import { King } from '../presets';

/**
 * Predict possible Check code even moving the code
 * @param  {Array}  timeline
 * @param  {String} selectedCode
 * @return {String}
 */
function predictPossibleCheck(timeline, selectedCode) {
  const { side } = parseCode(selectedCode);
  const [snapshot, ...prevSnapshots] = timeline;
  let kingCode = find(
    compose(equals(`${side}${King}`), prop('pKey'), parseCode),
    snapshot
  );
  let pretendSnapshot;
  let pretendTimeline;

  if (detectPiece(King, selectedCode)) {
    // move King to provided tile
    pretendSnapshot = replaceCode(snapshot, kingCode, selectedCode);
    pretendTimeline = [pretendSnapshot, ...prevSnapshots];

    kingCode = selectedCode;
  } else {
    // remove selectedCode from snapshot
    pretendSnapshot = reject(equals(selectedCode), snapshot);
    pretendTimeline = [pretendSnapshot, ...prevSnapshots];
  }

  return findAttacker(kingCode, pretendTimeline);
}

export default curry(predictPossibleCheck);
