import { curry, filter } from 'ramda';
import predictPossibleCheck from './predictPossibleCheck';
import { parseCode } from '../utils';

/**
 * Remove predict attacking tiles from provided tiles
 * @param  {Array}  timeline
 * @param  {String} code
 * @param  {Array}  tiles
 * @return {Array}
 */
function removePredictTiles(timeline, code, tiles) {
  const { pKey } = parseCode(code);

  return filter((tN) => !predictPossibleCheck(timeline, `${pKey}${tN}`), tiles);
}

export default curry(removePredictTiles);
