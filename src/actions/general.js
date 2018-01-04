import { setNotations } from '@actions/notations'
import { setRecords } from '@actions/records'
import { isExist, diff } from '@utils'

/**
 * Set next
 * @param  {Functions} fns
 * @return {Function}
 */
export const setNext = ({ getNextNotations, getNextRecords, getNextTurn }) => (dispatch, getState) => {
  const { general, notations: currNotations } = getState()
  const { turn } = general
  const nextTurn = getNextTurn(turn)
  const nextNotations = getNextNotations(currNotations)
  const nextRecords = getNextRecords(nextNotations)

  dispatch(setTurn(nextTurn))
  dispatch(setNotations(nextNotations))
  dispatch(setRecords(nextRecords))

  return Promise.resolve()
}

/**
 * Undo
 * @param  {Object}   args
 * @param  {Function} args.undo
 * @param  {Function} args.getPrevTurn
 * @param  {number?}  args.counts
 * @return {Function}
 */
export const revert = ({ undo, getPrevTurn, counts }) => (dispatch, getState) => {
  const { notations, general, records } = getState()

  if (isExist(records)) {
    const { turn } = general
    const { revertedRecords, revertedNotations } = undo(records)(counts)
    const prevTurn = getPrevTurn(turn)
    const isDiff = diff(notations, revertedNotations)

    if (isDiff) {
      dispatch(setRecords(revertedRecords))
      dispatch(setNotations(revertedNotations))
      dispatch(setTurn(prevTurn))
    }

    dispatch(setCommand(''))
  }

  return Promise.resolve()
}

export const setScreen = (screen) => ({
  type: 'SET_SCREEN',
  payload: screen
})

export const setCommand = (command) => ({
  type: 'SET_COMMAND',
  payload: command
})

export const setPlayState = (isPlaying) => ({
  type: 'SET_PLAYING',
  payload: isPlaying
})

export const setTurn = (turn) => ({
  type: 'SET_TURN',
  payload: turn
})
