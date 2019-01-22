import * as types from '~/actions'

export function toggleMatchStatus () {
  return {
    type: types.TOGGLE_MATCH_STATUS
  }
}

export function toggleTurn () {
  return {
    type: types.TOGGLE_TURN
  }
}
