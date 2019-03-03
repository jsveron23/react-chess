import { compose, ifElse, reject, thunkify, flip, identity, map } from 'ramda'
import * as types from '~/actions'
import { OPPONENT } from '~/chess/constants'
import {
  getNextMovable,
  getNextSnapshot,
  findCheckCode,
  applySpecialActions,
  createTimeline
} from '~/chess/core'
import {
  getSpecial,
  parseSelected,
  replaceSnapshot,
  createSelected,
  getPrevSnapshot,
  diffSnapshot
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

export function setNext (snapshot) {
  return (dispatch, getState) => {
    return Promise.all([setSnapshot(snapshot), setMovableAxis(), toggleTurn()])
      .then(map(dispatch))
      .then(() => {
        const { ingame } = getState()
        const { present, past } = ingame
        const { turn } = present

        const checkBy = findCheckCode(() => {
          const { side, piece, file, rank } = compose(
            diffSnapshot(snapshot),
            getPrevSnapshot
          )(past)

          return { turn, snapshot, side, piece, file, rank }
        })

        return Promise.all([setCheckBy(checkBy), setSelected()])
      })
      .then(map(dispatch))
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
    const { piece, side } = parseSelected(snapshot, selected)
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
