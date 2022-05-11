import { curry, compose, map, filter, flatten } from 'ramda';
import { convertAxisToTile } from '../utils';
import { Vertical, Horizontal } from '../presets';

function getSymmetryTile(direction, centralCode, baseTile) {
  const convertToTile = convertAxisToTile(centralCode);
  let startX = [1, -1];
  let startY = [1, -1];

  if (direction === Vertical) {
    startX = [0];
  } else if (direction === Horizontal) {
    startY = [0];
  }

  return compose(
    filter(Boolean),
    flatten,
    map((x) =>
      map((y) => {
        const tileName = convertToTile([x, y]);

        if (tileName === baseTile) {
          return convertToTile([-x, -y]);
        }
      }, startY)
    )
  )(startX);
}

export default curry(getSymmetryTile);
