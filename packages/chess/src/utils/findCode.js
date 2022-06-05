import { curry } from 'ramda';
import validateSnapshot from './validateSnapshot';

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

export default curry(findCode);
