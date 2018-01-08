import { connect } from 'react-redux'
import { Board } from '@components'
import { setNext, setTurn, resetMatch, revert } from '@actions/general'
import { setNotations } from '@actions/notations'
import { setRecords } from '@actions/records'
import { setMovable, resetMovable } from '@actions/movable'
import enhancer from '@utils/Enhancer/board'

/**
 * @param  {Object} state
 * @return {Object}
 */
function mapStateToProps ({ general, notations, records, movable }) {
  const { screen, command, turn } = general
  const isPlaying = screen !== 'main'

  return {
    command,
    isPlaying,
    notations,
    records,
    movable,
    turn
  }
}

const enhancedBoard = enhancer(Board)
const applyConnect = connect(mapStateToProps, {
  setNext,
  setNotations,
  setRecords,
  setMovable,
  setTurn,
  resetMovable,
  resetMatch,
  revert
})

export default applyConnect(enhancedBoard)
