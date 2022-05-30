import { curry, compose, reduce, cond, flip, append, always, T } from 'ramda';
import {
  findCodeByTile,
  convertAxisListToTiles,
  detectOpponent,
} from '../utils';

const _append = flip(append);

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
        [compose(detectOpponent(code), _findCodeBy), _append(acc)],
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
