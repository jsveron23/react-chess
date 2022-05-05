import { curry, compose, reduce } from 'ramda';
import {
  parseCode,
  findCodeByTile,
  convertAxisListToTiles,
  detectOpponent,
} from '../utils';

/**
 * Get diagonally tiles
 * @param  {String} code
 * @param  {Array}  snapshot
 * @return {Array}
 */
function getDiagonallyTiles(code, snapshot) {
  const findCodeBy = findCodeByTile(snapshot);

  return compose(
    reduce((acc, tN) => {
      const { tileName: nTileName, code: nCode } = compose(
        parseCode,
        findCodeBy
      )(tN);

      return detectOpponent(code, nCode) ? [...acc, nTileName] : acc;
    }, []),
    convertAxisListToTiles(code)
  )([
    [1, 1],
    [-1, 1],
  ]);
}

export default curry(getDiagonallyTiles);
