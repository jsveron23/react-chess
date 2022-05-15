import { curry } from 'ramda';
import parseCode from './parseCode';
import validateCode from './validateCode';
import computeDistanceByTiles from './computeDistanceByTiles';

/**
 * Compute distance by two different code
 * @param  {String} codeA
 * @param  {String} codeB
 * @return {Object}
 */
function computeDistance(codeA, codeB) {
  if (!validateCode(codeA) || !validateCode(codeB)) {
    throw new TypeError('invalid arguments');
  }

  const { tileName: aTileName } = parseCode(codeA);
  const { tileName: bTilename } = parseCode(codeB);

  return computeDistanceByTiles(aTileName, bTilename);
}

export default curry(computeDistance);
