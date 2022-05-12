import { curry } from 'ramda';
import parseCode from './parseCode';
import computeDistanceByTiles from './computeDistanceByTiles';

/**
 * Compute distance by two different code
 * @param  {String} aCode
 * @param  {String} bCode
 * @return {Object}
 */
function computeDistance(aCode, bCode) {
  const { tileName: aTileName } = parseCode(aCode);
  const { tileName: bTilename } = parseCode(bCode);

  return computeDistanceByTiles(aTileName, bTilename);
}

export default curry(computeDistance);
