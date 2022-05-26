import debug from './debug';

export function setItem(key, data) {
  try {
    let val = data;

    if (typeof data !== 'string') {
      val = JSON.stringify(data);
    }

    localStorage.setItem(key, val);
  } catch (err) {
    debug.err('localStorage - setItem issue: ', err);
  }
}

export function getItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    debug.err('localStorage - getItem issue: ', err);
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    debug.err('localStorage - removeItem issue: ', err);
  }
}

export function clear() {
  try {
    localStorage.clear();
  } catch (err) {
    debug.err('localStorage - clear issue: ', err);
  }
}
