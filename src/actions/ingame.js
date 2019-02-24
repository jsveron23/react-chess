import { compose, filter, flip, prop } from 'ramda'
import * as types from '~/actions'
import { OPPONENT } from '~/chess/constants'
import {
  getMovableAxis,
  getNextSnapshot,
  applySpecialActions,
  createTimeline
} from '~/chess/core'
import {
  getSpecial,
  parseSelected,
  replaceSnapshot,
  getSide,
  parseCode,
  findCode
} from '~/chess/helpers'
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

export function setMovable (tile) {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { present } = ingame
    const { turn, snapshot } = present

    const flippedGetMovableAxis = compose(
      flip,
      getMovableAxis
    )(tile)

    const movableAxis = compose(
      flippedGetMovableAxis(turn),
      prop('piece'),
      parseCode,
      findCode(snapshot)
    )(tile)

    dispatch(setMovableAxis(movableAxis))
    dispatch(setSelected(`${tile}-${getSide(turn)}`))
  }
}

export function setNext (tile) {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { present, past } = ingame
    const { selected, snapshot } = present
    const { piece, side } = parseSelected(selected, snapshot)
    const special = getSpecial(piece)
    let nextSnapshot = getNextSnapshot(selected, tile, snapshot)

    if (isExist(special)) {
      nextSnapshot = compose(
        applySpecialActions(side, special, tile),
        createTimeline(nextSnapshot)
      )(past)
    }

    dispatch(setSnapshot(nextSnapshot))
    dispatch(setMovableAxis())
    dispatch(toggleTurn())
  }
}

export function setCapturedNext ({ capturedTile, selectedTile, replaceCode }) {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { present } = ingame

    const capturedSnapshot = compose(
      filter(isExist),
      replaceSnapshot(replaceCode, selectedTile),
      replaceSnapshot('', capturedTile)
    )(present.snapshot)

    dispatch(setSnapshot(capturedSnapshot))
    dispatch(setMovableAxis())
    dispatch(toggleTurn())
  }
}
