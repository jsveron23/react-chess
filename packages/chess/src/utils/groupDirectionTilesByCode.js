import { compose, reduce, prop, flip } from 'ramda';
import arrowToNextTiles from './arrowToNextTiles';
import parseCode from './parseCode';
import { AxisGroupByDirection, DirectionGroupByPiece } from '../presets';

/**
 * Convert axis to tiles in `DirectionGroupByPiece` base on code tile
 * @param  {String} code
 * @return {Object} same format as `DirectionGroupByPiece` but all axis converted as tiles
 */
function groupDirectionTilesByCode(code) {
  return compose(
    // convert axis items to next tiles items
    reduce((acc, directionKey) => {
      const directionVal = AxisGroupByDirection[directionKey];

      return {
        ...acc,
        [directionKey]: arrowToNextTiles(code, directionVal),
      };
    }, {}),

    // figuring out which direction of piece
    flip(prop)(DirectionGroupByPiece),
    prop('piece'),
    parseCode
  )(code);
}

export default groupDirectionTilesByCode;
