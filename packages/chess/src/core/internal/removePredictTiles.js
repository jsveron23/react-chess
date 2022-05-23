import { curry, compose, concat, not } from 'ramda';
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
  const _predictCheck = predictPossibleCheck(timeline);

  return tiles.filter(
    compose(not, _predictCheck, concat(parseCode.prop('pKey', code)))
  );
}

export default curry(removePredictTiles);
