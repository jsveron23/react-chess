import { curry, compose } from 'ramda';
import parseCode from './parseCode';
import validateCode from './validateCode';
import getTilesDifference from './getTilesDifference';

const toTN = parseCode.prop('tileName');

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

  return compose(getTilesDifference(toTN(codeA)), toTN)(codeB);
}

export default curry(computeDistance);
