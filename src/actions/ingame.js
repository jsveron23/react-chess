import * as types from '~/actions'
import { ENEMY } from '~/chess/constants'

export function setSelected (piece) {
  return {
    type: types.SET_SELECTED,
    payload: piece || ''
  }
}

export function setMovableTiles (movable) {
  return {
    type: types.SET_MOVABLE_TILES,
    payload: movable
  }
}

export function toggleTurn () {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { present } = ingame
    const { turn } = present

    dispatch({
      type: types.TOGGLE_TURN,
      payload: ENEMY[turn]
    })
  }
}

export function setLineup (alignedPieces) {
  return {
    type: types.SET_LINEUP,
    payload: alignedPieces
  }
}

export function resetLineup () {
  return {
    type: types.RESET_LINEUP
  }
}
