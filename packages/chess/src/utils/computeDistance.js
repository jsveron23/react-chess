import { curry } from 'ramda';
import parseCode from './parseCode';
import validateCode from './validateCode';
import getTilesDifference from './getTilesDifference';

const _toTN = parseCode.prop('tileName');

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

  return getTilesDifference(_toTN(codeA), _toTN(codeB));
}

export default curry(computeDistance);
