import { debug } from '~/utils';

/**
 * Save item to localStorage
 * @param {string} key - Storage key
 * @param {*} data - Data to store
 */
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

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @return {string|null} Stored value
 */
export function getItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    debug.err('localStorage - getItem issue: ', err);
  }
}

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    debug.err('localStorage - removeItem issue: ', err);
  }
}

/**
 * Clear all localStorage items
 */
export function clear() {
  try {
    localStorage.clear();
  } catch (err) {
    debug.err('localStorage - clear issue: ', err);
  }
}
