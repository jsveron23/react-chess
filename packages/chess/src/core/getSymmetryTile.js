import { curry, compose, map, filter, flatten, nth } from 'ramda';
import { convertAxisToTile } from '../utils';
import { Vertical, Horizontal } from '../presets';

/**
 * Get symmetry tile (eg. c6 - e4, d5 - d3)
 * @param  {String} direction
 * @param  {String} centralCode
 * @param  {String} targetTile
 * @return {String}
 */
function getSymmetryTile(direction, centralCode, targetTile) {
  const convertToTile = convertAxisToTile(centralCode);
  let startX = [1, -1];
  let startY = [1, -1];

  if (direction === Vertical) {
    startX = [0];
  } else if (direction === Horizontal) {
    startY = [0];
  }

  return compose(
    nth(0),
    filter(Boolean),
    flatten,

    // runs only 4(2 x 2) times
    map((x) =>
      map((y) => {
        const tileName = convertToTile([x, y]);

        if (tileName === targetTile) {
          return convertToTile([-x, -y]);
        }
      }, startY)
    )
  )(startX);
}

export default curry(getSymmetryTile);
