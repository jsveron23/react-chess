import * as types from '~/actions'
import { ENEMY } from '~/chess/constants'

export function toggleMatchStatus () {
  return {
    type: types.TOGGLE_MATCH_STATUS
  }
}

export function toggleTurn () {
  return (dispatch, getState) => {
    const { general } = getState()
    const { turn } = general

    dispatch({
      type: types.TOGGLE_TURN,
      payload: ENEMY[turn]
    })
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
