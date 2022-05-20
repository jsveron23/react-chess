import { curry, filter } from 'ramda';
import predictPossibleCheck from '../predictPossibleCheck';
import { parseCode } from '../../utils';

/**
 * Remove predict attacking tiles from given tiles
 * @param  {Array}  timeline
 * @param  {String} code
 * @param  {Array}  tiles
 * @return {Array}
 */
function removePredictTiles(timeline, code, tiles) {
  const { pKey } = parseCode(code);
  const _predictPossibleCheck = predictPossibleCheck(timeline);

  return filter((tN) => !_predictPossibleCheck(`${pKey}${tN}`), tiles);
}

export default curry(removePredictTiles);
