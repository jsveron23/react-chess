import { curry, keys, filter, nth, compose, defaultTo } from 'ramda';
import parseTile from './parseTile';
import getDistance from './getDistance';
import { File, Rank, Diagonal, Vertical, Horizontal } from '../presets';

/**
 * Compute distance by two different tiles
 * @param  {String} tileA
 * @param  {String} tileB
 * @return {Object}
 */
function computeDistanceByTiles(tileA, tileB) {
  const { fileName: aFn, rankName: aRn } = parseTile(tileA);
  const { fileName: dFn, rankName: dRn } = parseTile(tileB);
  const file = Math.abs(getDistance(aFn, dFn, File));
  const rank = Math.abs(getDistance(aRn, dRn, Rank));
  const directionMap = {
    [Diagonal]: file === rank,
    [Vertical]: rank > 0 && file === 0,
    [Horizontal]: file > 0 && rank === 0,
  };
  const direction = compose(
    defaultTo(''),
    nth(0),
    filter((key) => directionMap[key]),
    keys
  )(directionMap);

  return {
    contact:
      (file === 1 && rank === 1) ||
      (file === 1 && rank === 0) ||
      (file === 0 && rank === 1),
    isVertical: direction === Vertical,
    isHorizontal: direction === Horizontal,
    isDiagonal: direction === Diagonal,
    direction,
    file,
    rank,
  };
}

export default curry(computeDistanceByTiles);
