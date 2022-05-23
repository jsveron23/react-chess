import { compose, reduce, prop, flip } from 'ramda';
import convertArrowToTiles from './convertArrowToTiles';
import { parseCode } from '../../utils';
import {
  AxisGroupByDirection as AGBD,
  DirectionGroupByPiece as DGBP,
} from '../../presets';

/**
 * Convert all axis to tiles from `DirectionGroupByPiece`
 * @see computeMTByDirection.js
 * @param  {String} code where piece placed
 * @return {Object} same format as `DirectionGroupByPiece`
 */
function groupDirectionTilesByCode(code) {
  return compose(
    reduce((acc, directionKey) => {
      return {
        ...acc,
        [directionKey]: compose(
          convertArrowToTiles(code),
          prop(directionKey)
        )(AGBD),
      };
    }, {}),
    compose(flip(prop)(DGBP), parseCode.prop('piece'))
  )(code);
}

export default groupDirectionTilesByCode;
