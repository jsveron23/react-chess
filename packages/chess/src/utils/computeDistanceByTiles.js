import { curry } from 'ramda';
import getTilesDifference from './getTilesDifference';

/**
 * Compute distance by two different tiles
 * @param  {String} tileA
 * @param  {String} tileB
 * @return {Object}
 */
function computeDistanceByTiles(tileA, tileB) {
  const { file, rank } = getTilesDifference(tileA, tileB);

  return {
    file,
    rank,
  };
}

export default curry(computeDistanceByTiles);
