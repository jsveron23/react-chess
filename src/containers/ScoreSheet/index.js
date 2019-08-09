import { connect } from 'react-redux'
import { ScoreSheet } from '~/components'
import createSheet from './createSheet'

function mapStateToProps ({ general, ingame }) {
  const { present, past } = ingame
  const { isDoingMatch } = general

  return {
    isDoingMatch,
    sheet: createSheet(present.snapshot, past)
  }
}

const ScoreSheetContainer = connect(mapStateToProps)(ScoreSheet)

export default ScoreSheetContainer
