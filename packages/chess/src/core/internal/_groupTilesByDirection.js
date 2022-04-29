import { compose, map, filter, reduce, prop, flip, keys } from 'ramda';
import getNextTile from '../getNextTile';
import parseCode from '../parseCode';
import { Vertical, Horizontal, Diagonal, Jumpover } from '../../chess';

// prettier-ignore
const GroupAxisByDirection = {
  [Vertical]: {
    Up: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]],
    Down: [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]]
  },

  [Horizontal]: {
    Right: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]],
    Left: [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]]
  },

  [Diagonal]: {
    TopRight: [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]],
    BottomRight: [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]],
    TopLeft: [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]],
    BottomLeft: [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]]
  },

  [Jumpover]: {
    TopRight1: [[1, 2]],
    TopRight2: [[2, 1]],
    TopLeft1: [[-1, 2]],
    TopLeft2: [[-2, 1]],
    BottomRight1: [[1, -2]],
    BottomRight2: [[2, -1]],
    BottomLeft1: [[-1, -2]],
    BottomLeft2: [[-2, -1]]
  }
}

const GroupDirectionByPiece = {
  K: [Vertical, Horizontal, Diagonal],
  B: [Diagonal],
  N: [Jumpover],
  P: [Vertical],
  Q: [Vertical, Horizontal, Diagonal],
  R: [Vertical, Horizontal],
};

/**
 * Convert axis to tiles in `GroupDirectionByPiece`
 * @param  {String} code
 * @return {Object}
 */
function _groupTilesByDirection(code) {
  const _getNextTiles = (axis) => {
    return compose(filter(Boolean), map(getNextTile(code)))(axis);
  };

  return compose(
    reduce((acc, directionKey) => {
      const directionVal = GroupAxisByDirection[directionKey];

      const _arrowToTiles = (acc, arrowKey) => {
        return {
          ...acc,
          [arrowKey]: _getNextTiles(directionVal[arrowKey]),
        };
      };

      return {
        ...acc,
        [directionKey]: compose(reduce(_arrowToTiles, {}), keys)(directionVal),
      };
    }, {}),
    flip(prop)(GroupDirectionByPiece),
    prop('piece'),
    parseCode
  )(code);
}

export default _groupTilesByDirection;
