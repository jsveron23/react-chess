/**
 * Set Movable
 * @param  {Array}  movable
 * @return {Object}
 */
export function setMovable (movable) {
  return {
    type: 'SET_MOVABLE',
    payload: movable
  }
}

/**
 * Reset movable after moving
 * @return {Object}
 */
export function resetMovable () {
  return {
    type: 'RESET_MOVABLE'
  }
}
