import { curry, compose, map, filter } from 'ramda';
import convertAxisToTile from './convertAxisToTile';

/**
 * Convert axis list to tiles
 * @param  {String} code where piece placed
 * @param  {Array}  axisList
 * @return {Array}
 */
function convertAxisListToTiles(code, axisList) {
  return compose(filter(Boolean), map(convertAxisToTile(code)))(axisList);
}

export default curry(convertAxisListToTiles);
