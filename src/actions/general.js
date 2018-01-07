import { setNotations } from '@actions/notations'
import { setRecords } from '@actions/records'
import { isExist, diff } from '@utils'

/**
 * Refresh board to perform next turn and starting animation
 * @param  {Function} fns
 * @return {Function}
 */
export const setNext = (fns) => (dispatch, getState) => {
  dispatch({ type: 'SET_NEXT' })

  const { general, notations: currNotations } = getState()
  const { getNextNotations, getNextRecords, getNextTurn } = fns
  const { turn } = general
  const nextTurn = getNextTurn(turn)
  const nextNotations = getNextNotations(currNotations)
  const nextRecords = getNextRecords(nextNotations)

  dispatch(setTurn(nextTurn))
  dispatch(setNotations(nextNotations))
  dispatch(setRecords(nextRecords))

  return Promise.resolve({ type: 'SET_NEXT_DONE' })
    .then(dispatch)
}

/**
 * Undo previous turn
 * @param  {Object}   args
 * @return {Function}
 */
export const revert = (args) => (dispatch, getState) => {
  dispatch({ type: 'REVERT' })

  const { notations, general, records } = getState()

  if (isExist(records)) {
    const { undo, getPrevTurn, counts } = args
    const applyUndo = undo(records)
    const { revertedRecords, revertedNotations } = applyUndo(counts)
    const isDiff = diff(notations, revertedNotations)

    if (isDiff) {
      const { turn } = general
      const prevTurn = getPrevTurn(turn)

      dispatch(setRecords(revertedRecords))
      dispatch(setNotations(revertedNotations))
      dispatch(setTurn(prevTurn))
    }

    dispatch(resetCommand())
  }

  return Promise.resolve({ type: 'REVERT_DONE' })
    .then(dispatch)
}

/**
 * Set current screen
 * @param {string} screen
 */
export const setScreen = (screen) => ({
  type: 'SET_SCREEN',
  payload: screen
})

/**
 * Set command to do
 * @param {string} command
 */
export const setCommand = (command) => ({
  type: 'SET_COMMAND',
  payload: command
})

/**
 * Reset command after doing dommand
 * @param {string} command
 */
export const resetCommand = () => ({
  type: 'RESET_COMMAND'
})

/**
 * Set turn
 * @param {string} turn
 */
export const setTurn = (turn) => ({
  type: 'SET_TURN',
  payload: turn
})
