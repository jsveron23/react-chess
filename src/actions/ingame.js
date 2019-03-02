import { compose, ifElse, reject, thunkify, flip, prop, identity } from 'ramda'
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
  parseCode,
  findCode,
  createSelected
} from '~/chess/helpers'
import { isEmpty, isExist } from '~/utils'

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
    const nextSelected = createSelected(tile, turn)

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
    dispatch(setSelected(nextSelected))
  }
}

export function setNext (tile) {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { present, past } = ingame
    const { selected, snapshot } = present
    const { piece, side } = parseSelected(selected, snapshot)
    const special = getSpecial(piece)
    const thunkIsExist = thunkify(isExist)

    const getSpecialActionsFn = compose(
      applySpecialActions(side, special, tile),
      flip(createTimeline)(past)
    )

    const nextSnapshot = compose(
      ifElse(thunkIsExist(special), getSpecialActionsFn, identity),
      getNextSnapshot(selected, tile)
    )(snapshot)

    dispatch(setSnapshot(nextSnapshot))
    dispatch(setMovableAxis())
    dispatch(toggleTurn())
  }
}

export function setCapturedNext ({ capturedTile, selectedTile, nextCode }) {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { present } = ingame

    const capturedSnapshot = compose(
      reject(isEmpty),
      replaceSnapshot(nextCode, selectedTile),
      replaceSnapshot('', capturedTile)
    )(present.snapshot)

    dispatch(setSnapshot(capturedSnapshot))
    dispatch(setMovableAxis())
    dispatch(toggleTurn())
  }
}
