import { curry, clone, filter } from 'ramda';
import validateCode from './validateCode';
import validateSnapshot from './validateSnapshot';

function replaceSnapshot(snapshot, currCode, nextCode) {
  if (
    !validateCode(currCode) ||
    !validateCode(nextCode) ||
    !validateSnapshot(snapshot)
  ) {
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

export default curry(replaceSnapshot);
