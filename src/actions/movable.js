import * as types from '@actions'

export function setMovable (movable) {
  return {
    type: types.SET_MOVABLE,
    payload: movable
  }
}

export function resetMovable () {
  return {
    type: types.RESET_MOVABLE
  }
}
