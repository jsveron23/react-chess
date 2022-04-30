import { curry, compose, map, filter } from 'ramda';
import getNextTile from './getNextTile';

/**
 * Convert next tiles from axis list based where where piece stands
 * @param  {String} code
 * @param  {Array}  axis
 * @return {Array}
 */
function getNextTiles(code, axis) {
  return compose(filter(Boolean), map(getNextTile(code)))(axis);
}

export default curry(getNextTiles);
