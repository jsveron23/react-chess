import { curry, compose, reduce, cond, flip, append, always, T } from 'ramda';
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
      return cond([
        [
          compose(detectOpponent(code), parseCode.prop('code'), _findCodeBy),
          flip(append)(acc),
        ],
        [T, always(acc)],
      ])(tN);
    }, []),
    convertAxisListToTiles(code)
  )([
    [1, 1],
    [-1, 1],
  ]);
}

export default curry(getDiagonallyTiles);
