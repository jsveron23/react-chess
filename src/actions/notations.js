/**
 * Set notations
 * @param  {Array}  notations
 * @return {Object}
 */
export function setNotations (notations) {
  return {
    type: 'SET_NOTATIONS',
    payload: notations
  }
}

/**
 * Reset notations
 * @return {Object}
 */
export function resetNotations () {
  return {
    type: 'RESET_NOTATIONS'
  }
}
