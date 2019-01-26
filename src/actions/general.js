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

export function selectPiece (piece) {
  return {
    type: types.SELECT_PIECE,
    payload: piece
  }
}

export function setCurrentMovable (movable) {
  return {
    type: types.CURRENT_MOVABLE_TILES,
    payload: movable
  }
}
