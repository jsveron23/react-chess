import { compose, reduce, prop, flip } from 'ramda';
import convertArrowToTiles from './convertArrowToTiles';
import { parseCode } from '../../utils';
import { AxisGroupByDirection, DirectionGroupByPiece } from '../../presets';

/**
 * Convert all axis to tiles from `DirectionGroupByPiece`
 * @see computeMTByDirection.js
 * @param  {String} code where piece placed
 * @return {Object} same format as `DirectionGroupByPiece`
 */
function groupDirectionTilesBy(code) {
  const _extractDirection = compose(
    flip(prop)(DirectionGroupByPiece),
    prop('piece'),
    parseCode
  );

  const _convertToTiles = (acc, directionKey) => {
    return {
      ...acc,
      [directionKey]: compose(
        convertArrowToTiles(code),
        prop(directionKey)
      )(AxisGroupByDirection),
    };
  };

  return compose(reduce(_convertToTiles, {}), _extractDirection)(code);
}

export default groupDirectionTilesBy;
