import { curry, clone, filter } from 'ramda';
import validateCode from './validateCode';
import validateSnapshot from './validateSnapshot';

/**
 * Replace code
 * @param  {Array}  snapshot
 * @param  {String} currCode
 * @param  {String} nextCode
 * @return {Array}
 */
function replaceCode(snapshot, currCode, nextCode) {
  const invalidCode = !validateCode(currCode) || !validateCode(nextCode);

  if (invalidCode || !validateSnapshot(snapshot)) {
    return snapshot || [];
  }

  const cloneSnapshot = clone(snapshot);

  for (let i = 0, len = cloneSnapshot.length; i < len; i++) {
    const code = cloneSnapshot[i];

    if (code === currCode) {
      cloneSnapshot[i] = nextCode;

      break;
    }
  }

  return filter(Boolean, cloneSnapshot);
}

export default curry(replaceCode);
