import { curry, reject, compose, equals, prop, find } from 'ramda';
import findAttacker from './findAttacker';
import { parseCode } from '../utils';
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
  const kingCode = find(
    compose(equals(`${side}${King}`), prop('pKey'), parseCode),
    snapshot
  );

  // pretend remove selectedCode from snapshot
  const pretendSnapshot = reject(equals(selectedCode), snapshot);
  const pretendTimeline = [pretendSnapshot, ...prevSnapshots];

  return findAttacker(kingCode, pretendTimeline);
}

export default curry(predictPossibleCheck);
