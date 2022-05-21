import { curry, keys, filter, nth, compose, defaultTo } from 'ramda';
import { Diagonal, Vertical, Horizontal } from '../presets';

/**
 * Get direction
 * @param  {String} file
 * @param  {String} rank
 * @return {String}
 */
function getDirection(file, rank) {
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
    isVertical: direction === Vertical,
    isHorizontal: direction === Horizontal,
    isDiagonal: direction === Diagonal,
    direction,
  };
}

export default curry(getDirection);
