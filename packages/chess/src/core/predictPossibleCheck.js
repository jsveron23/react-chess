import { curry, reject, compose, equals, prop, find, includes } from 'ramda';
import findAttacker from './findAttacker';
import { replaceCode, parseCode, detectPiece } from '../utils';
import { King } from '../presets';

/**
 * Predict possible Check code even moving the code
 * @param  {Array}  timeline
 * @param  {String} targetCode
 * @return {String} attacker code
 */
function predictPossibleCheck(timeline, targetCode) {
  const { side } = parseCode(targetCode);
  const [snapshot, ...prevSnapshots] = timeline;
  let kingCode = find(
    compose(equals(`${side}${King}`), prop('pKey'), parseCode),
    snapshot
  );
  let pretendSnapshot;
  let pretendTimeline;

  if (detectPiece(King, targetCode)) {
    // NOTE if it's already piece on tile there, remove it
    const { tileName } = parseCode(targetCode);
    const filteredSnapshot = reject(includes(tileName), snapshot);

    // NOTE `targetCode` is not selected code
    pretendSnapshot = replaceCode(filteredSnapshot, kingCode, targetCode);
    pretendTimeline = [pretendSnapshot, ...prevSnapshots];

    kingCode = targetCode;
  } else {
    // NOTE `targetCode` === `selectedCode`

    // remove `targetCode` from snapshot
    pretendSnapshot = reject(equals(targetCode), snapshot);
    pretendTimeline = [pretendSnapshot, ...prevSnapshots];
  }

  return findAttacker(kingCode, pretendTimeline);
}

export default curry(predictPossibleCheck);
