import { setNotations, resetNotations } from '@actions/notations'
import { setRecords, resetRecords } from '@actions/records'
import { diff } from '@utils'

/**
 * Refresh board to perform next turn and starting animation
 * @param  {...Function} fns
 * @return {Function}
 */
export const setNext = (fns) => (dispatch, getState) => {
  const { general, notations: currNotations } = getState()
  const { getNextNotations, getNextRecords, getNextTurn } = fns
  const { turn } = general
  const nextTurn = getNextTurn(turn)
  const nextNotations = getNextNotations(currNotations)
  const nextRecords = getNextRecords(nextNotations)

  dispatch(setTurn(nextTurn))
  dispatch(setNotations(nextNotations))
  dispatch(setRecords(nextRecords))

  return Promise.resolve({ type: 'SET_NEXT' })
    .then(dispatch)
}

/**
 * Undo previous turn
 * @param  {...Function} fns
 * @return {Function}
 * TODO implement undo-redo
 */
export const revert = (fns) => (dispatch, getState) => {
  const { notations, general } = getState()
  const { applyUndo, getPrevTurn } = fns
  const { revertedRecords, revertedNotations } = applyUndo()
  const isDiff = diff(notations, revertedNotations)

  if (isDiff) {
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

/**
 * Set axis for performing animation
 * @param  {Object} payload
 * @return {Object}
 */
export const setAxis = (payload) => ({
  type: 'SET_AXIS',
  payload
})

/**
 * Reset match
 * @return {Function}
 */
export const resetMatch = () => (dispatch) => {
  dispatch(setTurn('white'))
  dispatch(resetNotations())
  dispatch(resetRecords())

  return Promise.resolve()
}

/**
 * Set current screen
 * @param  {string} screen
 * @return {Object}
 */
export const setScreen = (screen) => ({
  type: 'SET_SCREEN',
  payload: screen
})

/**
 * Set command to do
 * @param  {string} command
 * @return {Object}
 */
export const setCommand = (command) => ({
  type: 'SET_COMMAND',
  payload: command
})

/**
 * Reset command after doing dommand
 * @param  {string} command
 * @return {Object}
 */
export const resetCommand = () => ({
  type: 'RESET_COMMAND'
})

/**
 * Set turn
 * @param  {string} turn
 * @return {Object}
 */
export const setTurn = (turn) => ({
  type: 'SET_TURN',
  payload: turn
})
