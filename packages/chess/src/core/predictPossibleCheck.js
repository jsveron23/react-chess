import { curry, compose, equals, prop, find } from 'ramda';
import findAttacker from './findAttacker';
import {
  replaceCode,
  parseCode,
  detectPiece,
  removeCodeByTile,
} from '../utils';
import { King } from '../presets';

/**
 * Predict possible Check when moving the code
 * @param  {Array}  timeline
 * @param  {String} targetCode
 * @return {String} attacker code
 */
function predictPossibleCheck(timeline, targetCode) {
  const { side, tileName } = parseCode(targetCode);
  const [snapshot, ...prevSnapshots] = timeline;
  let kingCode = find(
    compose(equals(`${side}${King}`), prop('pKey'), parseCode),
    snapshot
  );
  let pretendSnapshot;

  if (detectPiece(King, targetCode)) {
    // NOTE if it's already piece on tile there, remove it
    const filteredSnapshot = removeCodeByTile(snapshot, tileName);

    // NOTE `targetCode` is not selected code
    pretendSnapshot = replaceCode(filteredSnapshot, kingCode, targetCode);

    kingCode = targetCode;
  } else {
    // NOTE `targetCode` === `selectedCode`

    // remove `targetCode` from snapshot
    pretendSnapshot = removeCodeByTile(snapshot, tileName);
  }

  return findAttacker(kingCode, [pretendSnapshot, ...prevSnapshots]);
}

export default curry(predictPossibleCheck);
