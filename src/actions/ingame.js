import { compose, filter, prop as extract } from 'ramda'
import * as types from '~/actions'
import { OPPONENT } from '~/chess/constants'
import { getMovableAxis, getNextSnapshot, computeSpecial } from '~/chess/core'
import { getSpecial, parseSelected, replaceSnapshot } from '~/chess/helpers'
import { isExist } from '~/utils'

export function setSelected (piece) {
  return {
    type: types.SET_SELECTED,
    payload: piece || ''
  }
}

export function setMovableAxis (movable) {
  return {
    type: types.SET_MOVABLE_AXIS,
    payload: movable || []
  }
}

export function toggleTurn () {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { turn } = ingame.present

    dispatch({
      type: types.TOGGLE_TURN,
      payload: OPPONENT[turn]
    })
  }
}

export function setSnapshot (snapshot) {
  return {
    type: types.SET_SNAPSHOT,
    payload: snapshot
  }
}

export function setMovable ({ tile, staticTurn, piece }) {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { present } = ingame
    const selected = `${tile}-${staticTurn}`
    const movableAxis = getMovableAxis(tile, piece, present.turn)

    dispatch(setSelected(selected))
    dispatch(setMovableAxis(movableAxis))
  }
}

export function setNext (tile) {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { selected, snapshot, movableAxis } = ingame.present
    const { piece, side } = parseSelected(selected, snapshot)
    const special = getSpecial(piece)
    let nextSnapshot = getNextSnapshot(selected, tile, snapshot)

    if (isExist(special)) {
      nextSnapshot = compose(
        extract('snapshot'),
        computeSpecial(side, special, tile, nextSnapshot)
      )(movableAxis)
    }

    dispatch(setSnapshot(nextSnapshot))
    dispatch(setMovableAxis())
    dispatch(toggleTurn())
  }
}

export function setCapturedNext ({
  capturedTile,
  selectedTile,
  replaceSnapshotItem
}) {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { present } = ingame
    const capturedSnapshot = compose(
      filter(isExist),
      replaceSnapshot(replaceSnapshotItem, selectedTile),
      replaceSnapshot('', capturedTile)
    )(present.snapshot)

    dispatch(setSnapshot(capturedSnapshot))
    dispatch(setMovableAxis())
    dispatch(toggleTurn())
  }
}
