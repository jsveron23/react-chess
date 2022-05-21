import { curry } from 'ramda';
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
  const _predictCheck = predictPossibleCheck(timeline);

  return tiles.filter((tN) => !_predictCheck(`${pKey}${tN}`));
}

export default curry(removePredictTiles);
