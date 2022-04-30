import { compose, reduce, prop, flip } from 'ramda';
import arrowToNextTiles from './arrowToNextTiles';
import parseCode from './parseCode';
import {
  AxisGroupByDirection,
  Vertical,
  Horizontal,
  Diagonal,
  Jumpover,
} from '../chess';

/**
 * Convert axis to tiles in `GroupDirectionByPiece` base on code tile
 * @param  {String} code
 * @return {Object} same format as `GroupDirectionByPiece` but all axis converted as tiles
 */
function groupDirectionTilesByCode(code) {
  const GroupDirectionByPiece = {
    K: [Vertical, Horizontal, Diagonal],
    B: [Diagonal],
    N: [Jumpover],
    P: [Vertical],
    Q: [Vertical, Horizontal, Diagonal],
    R: [Vertical, Horizontal],
  };

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
    flip(prop)(GroupDirectionByPiece),
    prop('piece'),
    parseCode
  )(code);
}

export default groupDirectionTilesByCode;
