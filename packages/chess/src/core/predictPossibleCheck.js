import { curry } from 'ramda';
import findAttacker from './findAttacker';
import {
  replaceCode,
  parseCode,
  detectPiece,
  removeTileFrom,
  findKing,
} from '../utils';

/**
 * Predict possible Check when moving the code
 * @param  {Array}  timeline
 * @param  {String} targetCode
 * @return {String} attacker code
 */
function predictPossibleCheck(timeline, targetCode) {
  const { tileName } = parseCode(targetCode);
  const [snapshot, ...prevSnapshots] = timeline;
  let kingCode = findKing(targetCode, snapshot);
  let pretendSnapshot = removeTileFrom(snapshot, tileName);

  if (detectPiece.King(targetCode)) {
    pretendSnapshot = replaceCode(
      removeTileFrom(snapshot, tileName),
      kingCode,
      targetCode
    );

    kingCode = targetCode;
  }

  return findAttacker(kingCode, [pretendSnapshot, ...prevSnapshots]);
}

export default curry(predictPossibleCheck);
