import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Board } from '@components'
import {
  setTurn,
  setAxis,
  resetCommand
} from '@actions/general'
import {
  setNotations,
  resetNotations
} from '@actions/notations'
import {
  setMovable,
  resetMovable
} from '@actions/movable'
import {
  setRecords,
  resetRecords
} from '@actions/records'
import { compose, isDiff } from '@utils'
import enhancer from '@components/enhancer'

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

function mapDispatchToProps (dispatch) {
  const binedActionsCreators = bindActionCreators({
    setNotations,
    setRecords,
    setMovable,
    setAxis,
    resetMovable,
    resetCommand
  }, dispatch)

  return {
    setNext ({ getNextNotations, getNextRecords, getNextTurn }) {
      return ({ turn, notations }) => {
        const nextTurn = getNextTurn(turn)
        const nextNotations = getNextNotations(notations)
        const nextRecords = getNextRecords(nextNotations)

        dispatch(setTurn(nextTurn))
        dispatch(setNotations(nextNotations))
        dispatch(setRecords(nextRecords))

        return Promise.resolve()
      }
    },

    revert ({ applyUndo, getPrevTurn }) {
      return ({ notations, records, turn }) => {
        const {
          revertedRecords,
          revertedNotations
        } = applyUndo(records)

        if (isDiff(notations)(revertedNotations)) {
          const prevTurn = getPrevTurn(turn)

          dispatch(setRecords(revertedRecords))
          dispatch(setNotations(revertedNotations))
          dispatch(setTurn(prevTurn))
        }

        dispatch(resetCommand())

        return Promise.resolve()
      }
    },

    resetMatch ({ turn = 'white' } = {}) {
      dispatch(setTurn(turn))
      dispatch(resetNotations())
      dispatch(resetRecords())

      return Promise.resolve()
    },

    ...binedActionsCreators
  }
}

const applyConnect = compose(
  connect(mapStateToProps, mapDispatchToProps),
  enhancer
)

export default applyConnect(Board)
