import { connect } from 'react-redux'
import memoize from 'memoize-one'
import * as R from 'ramda'
import { ScoreSheet } from '~/components'
import { createNotation, createScoreSheet } from '~/chess/core'
import { createTimeline } from '~/chess/helpers'

const memoizeCreateSheet = memoize((snapshot, past) =>
  R.compose(
    createScoreSheet,
    R.reverse,
    createNotation,
    createTimeline(snapshot)
  )(past)
)

function mapStateToProps ({ general, ingame }) {
  const { present, past } = ingame
  const { isDoingMatch } = general
  const sheet = memoizeCreateSheet(present.snapshot, past)

  return { isDoingMatch, sheet }
}

const ScoreSheetContainer = connect(mapStateToProps)(ScoreSheet)

export default ScoreSheetContainer
