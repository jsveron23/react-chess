import { compose, ifElse, reject, thunkify, flip, identity } from 'ramda'
import * as types from '~/actions'
import { OPPONENT } from '~/chess/constants'
import {
  getNextMovable,
  getNextSnapshot,
  applySpecialActions,
  createTimeline
} from '~/chess/core'
import {
  getSpecial,
  parseSelected,
  replaceSnapshot,
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

export function setNext (snapshot) {
  return (dispatch) => {
    dispatch(setSnapshot(snapshot))
    dispatch(setMovableAxis())
    dispatch(toggleTurn())
    dispatch(setSelected())
  }
}

export function setNextMovableAxis (tile) {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { present } = ingame
    const { turn, snapshot } = present

    const nextSelected = createSelected(tile, turn)

    const nextMovableAxis = getNextMovable('axis', () => {
      return { tile, timeline: [snapshot], ...present }
    })

    dispatch(setMovableAxis(nextMovableAxis))
    dispatch(setSelected(nextSelected))
  }
}

export function setNextSnapshot (tile) {
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

    dispatch(setNext(nextSnapshot))
  }
}

export function setNextCapturedSnapshot ({
  capturedTile,
  selectedTile,
  nextCode
}) {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { present } = ingame

    const capturedSnapshot = compose(
      reject(isEmpty),
      replaceSnapshot(nextCode, selectedTile),
      replaceSnapshot('', capturedTile)
    )(present.snapshot)

    dispatch(setNext(capturedSnapshot))
  }
}
