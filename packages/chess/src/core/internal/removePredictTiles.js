import { curry, compose, concat, not, filter } from 'ramda';
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
  return filter(
    compose(
      not,
      predictPossibleCheck(timeline),
      concat(parseCode.prop('pKey', code))
    ),
    tiles
  );
}

export default curry(removePredictTiles);
