export function setItem(key, data) {
  try {
    let val = data;

    if (typeof data !== 'string') {
      val = JSON.stringify(data);
    }

    localStorage.setItem(key, val);
  } catch (err) {
    console.error('localStorage/setItem: ', err);
  }
}

export function getItem(key) {
  try {
    const val = localStorage.getItem(key);

    return JSON.parse(val);
  } catch (err) {
    console.error('localStorage/getItem: ', err);
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('localStorage/removeItem: ', err);
  }
}

export function clear() {
  try {
    localStorage.clear();
  } catch (err) {
    console.error('localStorage/clear: ', err);
  }
}
