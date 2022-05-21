import { allPass, complement, isNil, isEmpty } from 'ramda';

const isNotNil = complement(isNil);
const isNotEmpty = complement(isEmpty);
const _isArray = (v) => Array.isArray(v);

/**
 * Validate snapshot
 * @param  {Array}   snapshot
 * @return {Boolean}
 */
function validateSnapshot(snapshot) {
  return allPass([isNotNil, isNotEmpty, _isArray], snapshot);
}

export default validateSnapshot;
