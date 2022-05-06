import { curry, compose, reduce, keys } from 'ramda';
import { convertAxisListToTiles } from '../../utils';

/**
 * Convert arrow to tiles
 * @param  {String} code where piece placed
 * @param  {Array}  arrow axis list (Up, Down, Right, Left...)
 * @return {Object}
 */
function convertArrowToTiles(code, arrow) {
  return compose(
    reduce((acc, key) => {
      return {
        ...acc,
        [key]: convertAxisListToTiles(code, arrow[key]),
      };
    }, {}),
    keys
  )(arrow);
}

export default curry(convertArrowToTiles);
