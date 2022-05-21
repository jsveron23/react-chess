import { curry, compose, reduce, keys, assoc } from 'ramda';
import { convertAxisListToTiles } from '../../utils';

/**
 * Convert arrow to tiles
 * @param  {String} code where piece placed
 * @param  {Array}  arrow axis list (Up, Down, Right, Left...)
 * @return {Object}
 */
function convertArrowToTiles(code, arrow) {
  const _convertToTiles = convertAxisListToTiles(code);

  return compose(
    reduce((acc, key) => assoc(key, _convertToTiles(arrow[key]), acc), {}),
    keys
  )(arrow);
}

export default curry(convertArrowToTiles);
