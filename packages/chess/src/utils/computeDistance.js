import { curry, compose, prop } from 'ramda';
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

  return compose(
    computeDistanceByTiles(compose(prop('tileName'), parseCode)(codeA)),
    prop('tileName'),
    parseCode
  )(codeB);
}

export default curry(computeDistance);
