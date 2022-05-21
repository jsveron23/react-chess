import { compose, reduce, prop, flip, assoc } from 'ramda';
import convertArrowToTiles from './convertArrowToTiles';
import { parseCode } from '../../utils';
import { AxisGroupByDirection, DirectionGroupByPiece } from '../../presets';

/**
 * Convert all axis to tiles from `DirectionGroupByPiece`
 * @see computeMTByDirection.js
 * @param  {String} code where piece placed
 * @return {Object} same format as `DirectionGroupByPiece`
 */
function groupDirectionTilesByCode(code) {
  const _convertToTiles = convertArrowToTiles(code);

  return compose(
    reduce(
      (acc, key) => assoc(key, _convertToTiles(AxisGroupByDirection[key]), acc),
      {}
    ),
    flip(prop)(DirectionGroupByPiece),
    prop('piece'),
    parseCode
  )(code);
}

export default groupDirectionTilesByCode;
