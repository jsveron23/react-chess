import { curry } from 'ramda';
import { parseCode } from './parse-code';
import { validateCode } from './validate-code';
import { getTilesDifference } from './get-tiles-difference';

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

const computeDistanceCurried = curry(computeDistance);
export { computeDistanceCurried as computeDistance };
