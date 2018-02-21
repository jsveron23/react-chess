import {
  setNotations,
  resetNotations
} from '@actions/notations'
import {
  setRecords,
  resetRecords
} from '@actions/records'
import * as types from '@constants'
import { isDiff } from '@utils'

/** Refresh board to perform next turn and starting animation */
export function setNext (fns) {
  const {
    getNextNotations,
    getNextRecords,
    getNextTurn
  } = fns

  return (dispatch, getState) => {
    const {
      general,
      notations
    } = getState()
    const { turn } = general
    const nextTurn = getNextTurn(turn)
    const nextNotations = getNextNotations(notations)
    const nextRecords = getNextRecords(nextNotations)

    dispatch(setTurn(nextTurn))
    dispatch(setNotations(nextNotations))
    dispatch(setRecords(nextRecords))

    return Promise.resolve({ type: types.SET_NEXT })
      .then(dispatch)
  }
}

/** Undo previous turn */
export function revert (fns) {
  const {
    applyUndo,
    getPrevTurn
  } = fns

  return (dispatch, getState) => {
    const {
      notations,
      general
    } = getState()
    const {
      revertedRecords,
      revertedNotations
    } = applyUndo()

    if (isDiff(notations)(revertedNotations)) {
      const { turn } = general
      const prevTurn = getPrevTurn(turn)

      dispatch(setRecords(revertedRecords))
      dispatch(setNotations(revertedNotations))
      dispatch(setTurn(prevTurn))
    }

    dispatch(resetCommand())

    return Promise.resolve({ type: types.REVERT })
      .then(dispatch)
  }
}

/** Set axis for performing animation */
export function setAxis (payload) {
  return {
    type: types.SET_AXIS,
    payload
  }
}

/** Reset match */
export function resetMatch (turn = 'white') {
  return (dispatch) => {
    dispatch(setTurn(turn))
    dispatch(resetNotations())
    dispatch(resetRecords())

    return Promise.resolve({ type: types.RESET_MATCH })
      .then(dispatch)
  }
}

/** Set current screen */
export function setScreen (screen) {
  return {
    type: types.SET_SCREEN,
    payload: screen
  }
}

/** Set command to do */
export function setCommand (command) {
  return {
    type: types.SET_COMMAND,
    payload: command
  }
}

/** Reset command after doing dommand */
export function resetCommand () {
  return {
    type: types.RESET_COMMAND
  }
}

/** Set turn */
export function setTurn (turn) {
  return {
    type: types.SET_TURN,
    payload: turn
  }
}
