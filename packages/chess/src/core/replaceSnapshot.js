import { curry, clone } from 'ramda';
import validateCode from '../utils/validateCode';
import validateSnapshot from '../utils/validateSnapshot';

function replaceSnapshot(currCode, nextCode, snapshot) {
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

  return cloneSnapshot;
}

export default curry(replaceSnapshot);
