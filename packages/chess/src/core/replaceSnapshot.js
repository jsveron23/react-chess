import { curry, clone } from 'ramda';

function replaceSnapshot(currCode, nextCode, snapshot) {
  const cloneSnapshot = clone(snapshot);

  for (var i = 0, len = cloneSnapshot.length; i < len; i++) {
    const code = cloneSnapshot[i];

    if (code === currCode) {
      cloneSnapshot[i] = nextCode;

      break;
    }
  }

  return cloneSnapshot;
}

export default curry(replaceSnapshot);
