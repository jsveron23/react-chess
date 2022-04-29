import {
  compose,
  curry,
  map,
  filter,
  reduce,
  prop,
  flip,
  keys,
  values,
  flatten,
  intersection,
} from 'ramda';
import getNextTile from './getNextTile';
import parseCode from './parseCode';
import snapshotToTiles from './snapshotToTiles';
import { Vertical, Horizontal, Diagonal, Jumpover } from '../chess';

// prettier-ignore
const GroupDirectionByAxis = {
  [Vertical]: [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
    [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]
  ],

  [Horizontal]: [
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
    [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]
  ],

  [Diagonal]: [
    [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7],
    [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7],
    [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7],
    [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]
  ],

  [Jumpover]: [
    [1, 2], [1, -2], [-1, 2], [-1, -2]
  ]
}

const GroupDirectionByPiece = {
  K: [Vertical, Horizontal, Diagonal],
  B: [Diagonal],
  N: [Jumpover],
  P: [Vertical],
  Q: [Vertical, Horizontal, Diagonal],
  R: [Vertical, Horizontal],
};

function _groupTilesByDirection(code) {
  const getNextTiles = (axis) => {
    return compose(filter(Boolean), map(getNextTile(code)))(axis);
  };

  return compose(
    reduce((acc, propName) => {
      const axis = GroupDirectionByAxis[propName];

      return {
        ...acc,
        [propName]: getNextTiles(axis),
      };
    }, {}),
    flip(prop)(GroupDirectionByPiece),
    prop('piece'),
    parseCode
  )(code);
}

function computeBlockedTiles(code, snapshot, movableTiles) {
  // change all code to tiles
  const placedTiles = snapshotToTiles(snapshot);

  // generic direction group (tiles)
  const tilesGrp = _groupTilesByDirection(code);

  return compose(
    // remain only movable tiles
    // intersection(
    //   calculated actual movable tiles
    //   calculated generic blocked tiles,
    // )
    intersection(movableTiles),

    // until here, remove all blocked tiles and further tile
    flatten,
    values,
    reduce((acc, key) => {
      let lastIdx = -1;

      // ignore first tile also
      const _ignoreTilesAfter = (tile) => {
        if (lastIdx === -1) {
          lastIdx = placedTiles.indexOf(tile);
        }

        if (lastIdx > -1) {
          return '';
        }

        return tile;
      };

      return {
        ...acc,
        [key]: compose(
          filter(Boolean),
          filter(_ignoreTilesAfter)
        )(tilesGrp[key]),
      };
    }, {}),
    keys
  )(tilesGrp);
}

export default curry(computeBlockedTiles);
