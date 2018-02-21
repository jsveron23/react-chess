import * as types from '@constants'

/** Set notations */
export function setNotations (notations) {
  return {
    type: types.SET_NOTATIONS,
    payload: notations
  }
}

/** Reset notations */
export function resetNotations () {
  return {
    type: types.RESET_NOTATIONS
  }
}
