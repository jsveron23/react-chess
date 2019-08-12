import * as R from 'ramda'
import * as types from '~/actions'
import {
  getNextMovable,
  getNextSnapshot,
  findCheckCode,
  applySpecialActions
} from '~/chess/core'
import {
  getSpecial,
  getOpponentTurn,
  getPrevSnapshots,
  createTimeline,
  findCodeByTile,
  parseCode,
  replaceSnapshot,
  diffSnapshot
} from '~/chess/helpers'
import { isEmpty, lazy, merge } from '~/utils'

export function setTs (ts = +new Date()) {
  return {
    type: types.SET_TS,
    payload: ts
  }
}

export function setSelected (code = '') {
  return {
    type: types.SET_SELECTED,
    payload: code
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
    const { present } = ingame

    dispatch({
      type: types.TOGGLE_TURN,
      payload: getOpponentTurn(present.turn)
    })
  }
}

export function setCheckTo (tile = '') {
  return {
    type: types.SET_CHECK_TO,
    payload: tile
  }
}

export function setCheckBy (code = '') {
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
      parseCode,
      diffSnapshot(snapshot),
      R.prop(0),
      getPrevSnapshots
    )(past)

    dispatch(setCheckTo(checkTo))
    dispatch(setCheckBy(checkBy))
  }
}

export function setNextMovableAxis (tile) {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { present } = ingame
    const { snapshot } = present
    const { side, piece } = findCodeByTile(snapshot, tile)
    const nextSelected = merge.txt(side, piece, tile)

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
    const { piece, side } = parseCode(selected)
    const special = getSpecial(piece)

    const getSpecialActionsFn = R.compose(
      applySpecialActions(side, special, tile),
      R.flip(createTimeline)(past)
    )

    const nextSnapshot = R.compose(
      R.unless(isEmpty.lazy(special), getSpecialActionsFn),
      getNextSnapshot(selected, tile)
    )(snapshot)

    dispatch(setNext(nextSnapshot))
  }
}

export function setNextCapturedSnapshot ({ capturedTile, selectedTile, nextCode }) {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { present, past } = ingame
    const { snapshot } = present
    const { piece, side, tile } = parseCode(nextCode)
    const special = getSpecial(piece)

    const getSpecialActionsFn = R.compose(
      applySpecialActions(side, special, tile),
      R.flip(createTimeline)(past)
    )

    const nextSnapshot = R.compose(
      R.unless(isEmpty.lazy(special), getSpecialActionsFn),
      R.reject(isEmpty),
      replaceSnapshot(nextCode, selectedTile),
      replaceSnapshot('', capturedTile)
    )(snapshot)

    dispatch(setNext(nextSnapshot))
  }
}
