import {
  curry,
  compose,
  map,
  filter,
  nth,
  xprod,
  negate,
  equals,
  cond,
  T,
  F,
} from 'ramda';
import convertAxisToTile from './convertAxisToTile';
import { Vertical, Horizontal } from '../presets';

/**
 * Get symmetry tile (eg. c6 - e4, d5 - d3)
 * @param  {String} direction
 * @param  {String} centralCode
 * @param  {String} targetTile
 * @return {String}
 */
function getSymmetryTile(direction, centralCode, targetTile) {
  const _convertToTile = convertAxisToTile(centralCode);
  const _detectSameAsTarget = compose(equals(targetTile), _convertToTile);
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
    map(
      cond([
        [_detectSameAsTarget, compose(_convertToTile, map(negate))],
        [T, F],
      ])
    ),
    xprod(startX)
  )(startY);
}

export default curry(getSymmetryTile);
