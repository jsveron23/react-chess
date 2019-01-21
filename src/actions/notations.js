import * as types from '~/actions'

export function setNotations (notations) {
  return {
    type: types.SET_NOTATIONS,
    payload: notations
  }
}

export function resetNotations () {
  return {
    type: types.RESET_NOTATIONS
  }
}
