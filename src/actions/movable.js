import * as types from '@constants'

/** Set Movable */
export function setMovable (movable) {
  return {
    type: types.SET_MOVABLE,
    payload: movable
  }
}

/** Reset movable after moving */
export function resetMovable () {
  return {
    type: types.RESET_MOVABLE
  }
}
