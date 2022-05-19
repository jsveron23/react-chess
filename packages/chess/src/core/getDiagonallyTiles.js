import { curry, compose, reduce, prop } from 'ramda';
import {
  parseCode,
  findCodeByTile,
  convertAxisListToTiles,
  detectOpponent,
} from '../utils';

/**
 * Get diagonally forward attack tiles
 * @param  {String} code
 * @param  {Array}  snapshot
 * @return {Array}
 */
function getDiagonallyTiles(code, snapshot) {
  const _findCodeBy = findCodeByTile(snapshot);

  return compose(
    reduce((acc, tN) => {
      return compose(
        detectOpponent(code),
        prop('code'),
        parseCode,
        _findCodeBy
      )(tN)
        ? [...acc, tN]
        : acc;
    }, []),
    convertAxisListToTiles(code)
  )([
    [1, 1],
    [-1, 1],
  ]);
}

export default curry(getDiagonallyTiles);
