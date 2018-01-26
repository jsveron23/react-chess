import { connect } from 'react-redux'
import { Board } from '@components'
import { setNext, setTurn, setAxis, resetMatch, revert } from '@actions/general'
import { setNotations } from '@actions/notations'
import { setRecords } from '@actions/records'
import { setMovable, promotion, resetMovable } from '@actions/movable'
import enhancer from '@utils/Enhancer/board'
import { compose } from '@utils'

/**
 * @param  {Object} state
 * @return {Object}
 */
function mapStateToProps ({ general, notations, records, movable }) {
  const { screen, command, turn, axis } = general
  const isPlaying = screen !== 'main'

  return {
    command,
    isPlaying,
    notations,
    records,
    movable,
    turn,
    axis
  }
}

const applyConnect = compose(
  connect(mapStateToProps, {
    setNext,
    setNotations,
    setRecords,
    setMovable,
    setTurn,
    setAxis,
    promotion,
    resetMovable,
    resetMatch,
    revert
  }),
  enhancer
)

export default applyConnect(Board)
