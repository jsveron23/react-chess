import { curry, compose, reduce } from 'ramda';
import { parseCode, findCodeByTile, getNextTiles } from '../utils';

function getDiagonallyTiles(side, code, snapshot) {
  const findCodeBy = findCodeByTile(snapshot);

  return compose(
    reduce((acc, tN) => {
      const { side: nSide, tileName: nTileName } = compose(
        parseCode,
        findCodeBy
      )(tN);

      return side !== nSide ? [...acc, nTileName] : acc;
    }, []),
    getNextTiles(code)
  )([
    [1, 1],
    [-1, 1],
  ]);
}

export default curry(getDiagonallyTiles);
