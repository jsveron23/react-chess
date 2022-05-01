import { curry, compose, map, filter } from 'ramda';
import getNextTile from './getNextTile';

/**
 * Convert next tiles from axis list based where where piece stands
 * @param  {String} code
 * @param  {Array}  axisList
 * @return {Array}
 */
function getNextTiles(code, axisList) {
  return compose(filter(Boolean), map(getNextTile(code)))(axisList);
}

export default curry(getNextTiles);
