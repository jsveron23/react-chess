import { compose, reduce, prop, flip, assoc } from 'ramda';
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
    reduce(
      (acc, key) => assoc(key, convertArrowToTiles(code, AGBD[key]), acc),
      {}
    ),
    flip(prop)(DGBP),
    prop('piece'),
    parseCode
  )(code);
}

export default groupDirectionTilesByCode;
