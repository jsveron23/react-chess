import { curry } from 'ramda';
import parseCode from './parseCode';
import computeDistanceByTile from './computeDistanceByTile';

/**
 * Compute distance
 * @param  {String} aCode
 * @param  {String} bCode
 * @return {Object}
 */
function computeDistance(aCode, bCode) {
  const { tileName: aTileName } = parseCode(aCode);
  const { tileName: bTilename } = parseCode(bCode);

  return computeDistanceByTile(aTileName, bTilename);
}

export default curry(computeDistance);
