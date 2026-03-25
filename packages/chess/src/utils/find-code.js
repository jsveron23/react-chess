import { curry } from 'ramda';
import { validateSnapshot } from './validate-snapshot';

/**
 * Find code
 * @param  {Array}   snapshot
 * @param  {String}  code
 * @return {String?}
 */
function findCode(snapshot, code) {
  if (!validateSnapshot(snapshot)) {
    return '';
  }

  const strSnapshot = snapshot.join(',');
  const idx = strSnapshot.indexOf(code);

  return idx > -1 ? strSnapshot.slice(idx, idx + 4) : undefined;
}

const findCodeCurried = curry(findCode);
export { findCodeCurried as findCode };
