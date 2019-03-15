import * as R from 'ramda'
import * as types from '~/actions'
import { OPPONENT } from '~/chess/constants'
import {
  getNextMovable,
  getNextSnapshot,
  findCheckCode,
  applySpecialActions
} from '~/chess/core'
import {
  createTimeline,
  getSpecial,
  parseSelected,
  replaceSnapshot,
  createSelected,
  getPrevSnapshotList,
  diffSnapshot
} from '~/chess/helpers'
import { isEmpty, isExist, lazy, merge } from '~/utils'

export function setTs (ts = +new Date()) {
  return {
    type: types.SET_TS,
    payload: ts
  }
}

export function setSelected (piece = '') {
  return {
    type: types.SET_SELECTED,
    payload: piece
  }
}

export function setMovableAxis (movable = []) {
  return {
    type: types.SET_MOVABLE_AXIS,
    payload: movable
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

export function setCheckTo (tile) {
  return {
    type: types.SET_CHECK_TO,
    payload: tile
  }
}

export function setCheckBy (code) {
  return {
    type: types.SET_CHECK_BY,
    payload: code
  }
}

export function setSnapshot (snapshot) {
  return {
    type: types.SET_SNAPSHOT,
    payload: snapshot
  }
}

export function restartGame (ts = +new Date()) {
  return {
    type: types.RESTART_GAME,
    payload: ts
  }
}

export function setNext (snapshot) {
  return (dispatch, getState) => {
    dispatch(setSnapshot(snapshot))
    dispatch(setMovableAxis())
    dispatch(setSelected())
    dispatch(setTs())
    dispatch(toggleTurn())

    const { ingame } = getState()
    const { present, past } = ingame
    const { turn } = present
    const { checkTo, checkBy } = R.compose(
      findCheckCode,
      lazy,
      merge({ turn, snapshot }),
      diffSnapshot(snapshot),
      getPrevSnapshotList.withIndex(0)
    )(past)

    dispatch(setCheckTo(checkTo))
    dispatch(setCheckBy(checkBy))
  }
}

export function setNextMovableAxis (tile) {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { present } = ingame
    const { turn, snapshot } = present
    const nextSelected = createSelected(tile, turn)

    const nextMovableAxis = R.compose(
      getNextMovable('axis'),
      lazy
    )({ tile, timeline: [snapshot], ...present })

    dispatch(setMovableAxis(nextMovableAxis))
    dispatch(setSelected(nextSelected))
  }
}

export function setNextSnapshot (tile) {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { present, past } = ingame
    const { selected, snapshot } = present
    const { piece, side } = parseSelected(snapshot, selected)
    const special = getSpecial(piece)

    const getSpecialActionsFn = R.compose(
      applySpecialActions(side, special, tile),
      R.flip(createTimeline)(past)
    )

    const nextSnapshot = R.compose(
      R.ifElse(isExist.lazy(special), getSpecialActionsFn, R.identity),
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

    const capturedSnapshot = R.compose(
      R.reject(isEmpty),
      replaceSnapshot(nextCode, selectedTile),
      replaceSnapshot('', capturedTile)
    )(present.snapshot)

    dispatch(setNext(capturedSnapshot))
  }
}
