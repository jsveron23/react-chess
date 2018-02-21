import { connect } from 'react-redux'
import { Board } from '@components'
import {
  setNext,
  setAxis,
  resetMatch,
  resetCommand,
  revert
} from '@actions/general'
import { setNotations } from '@actions/notations'
import {
  setMovable,
  resetMovable
} from '@actions/movable'
import { setRecords } from '@actions/records'
import enhancer from '@utils/Enhancer/board'
import { compose } from '@utils'

function mapStateToProps ({ general, notations, records, movable }) {
  const {
    screen,
    command,
    turn,
    axis
  } = general
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
    setAxis,
    resetMovable,
    resetMatch,
    resetCommand,
    revert
  }),
  enhancer
)

export default applyConnect(Board)
