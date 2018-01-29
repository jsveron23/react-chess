import { setNotations, resetNotations } from '@actions/notations'
import { setRecords, resetRecords } from '@actions/records'
import { isDiff } from '@utils'

/**
 * Refresh board to perform next turn and starting animation
 * @param  {...Function} fns
 * @return {Function}
 */
export function setNext (fns) {
  const { getNextNotations, getNextRecords, getNextTurn } = fns

  return (dispatch, getState) => {
    const { general, notations } = getState()
    const { turn } = general
    const nextTurn = getNextTurn(turn)
    const nextNotations = getNextNotations(notations)
    const nextRecords = getNextRecords(nextNotations)

    dispatch(setTurn(nextTurn))
    dispatch(setNotations(nextNotations))
    dispatch(setRecords(nextRecords))

    return Promise.resolve({ type: 'SET_NEXT' })
      .then(dispatch)
  }
}

/**
 * Undo previous turn
 * @param  {...Function} fns
 * @return {Function}
 */
export function revert (fns) {
  const { applyUndo, getPrevTurn } = fns

  return (dispatch, getState) => {
    const { notations, general } = getState()
    const { revertedRecords, revertedNotations } = applyUndo()

    if (isDiff(notations, revertedNotations)) {
      const { turn } = general
      const prevTurn = getPrevTurn(turn)

      dispatch(setRecords(revertedRecords))
      dispatch(setNotations(revertedNotations))
      dispatch(setTurn(prevTurn))
    }

    dispatch(resetCommand())

    return Promise.resolve({ type: 'REVERT' })
      .then(dispatch)
  }
}

/**
 * Set axis for performing animation
 * @param  {Object} payload
 * @return {Object}
 */
export function setAxis (payload) {
  return {
    type: 'SET_AXIS',
    payload
  }
}

/**
 * Reset match
 * @return {Function}
 */
export function resetMatch () {
  return (dispatch) => {
    dispatch(setTurn('white'))
    dispatch(resetNotations())
    dispatch(resetRecords())

    return Promise.resolve({ type: 'RESET_MATCH' })
      .then(dispatch)
  }
}

/**
 * Set current screen
 * @param  {string} screen
 * @return {Object}
 */
export function setScreen (screen) {
  return {
    type: 'SET_SCREEN',
    payload: screen
  }
}

/**
 * Set command to do
 * @param  {string} command
 * @return {Object}
 */
export function setCommand (command) {
  return {
    type: 'SET_COMMAND',
    payload: command
  }
}

/**
 * Reset command after doing dommand
 * @param  {string} command
 * @return {Object}
 */
export function resetCommand () {
  return {
    type: 'RESET_COMMAND'
  }
}

/**
 * Set turn
 * @param  {string} turn
 * @return {Object}
 */
export function setTurn (turn) {
  return {
    type: 'SET_TURN',
    payload: turn
  }
}
