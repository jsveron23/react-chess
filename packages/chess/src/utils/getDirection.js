import { curry, keys, filter, head, compose, defaultTo } from 'ramda';
import { Diagonal, Vertical, Horizontal } from '../presets';

/**
 * Get direction
 * @param  {String} file index
 * @param  {String} rank index
 * @return {String}
 */
function getDirection(file, rank) {
  const directionMap = {
    [Diagonal]: file === rank,
    [Vertical]: rank > 0 && file === 0,
    [Horizontal]: file > 0 && rank === 0,
  };

  return compose(
    defaultTo(''),
    head,
    filter((key) => directionMap[key]),
    keys
  )(directionMap);
}

export default curry(getDirection);
