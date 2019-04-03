import { connect } from 'react-redux'
import memoize from 'memoize-one'
import * as R from 'ramda'
import { ScoreSheet } from '~/components'
import { createNotation, createScoreSheet } from '~/chess/core'
import { createTimeline } from '~/chess/helpers'

const memoAwaitCreateSheet = memoize(
  (snapshot) =>
    R.compose(
      createScoreSheet,
      R.reverse,
      createNotation,
      createTimeline(snapshot)
    ),
  R.equals
)

function mapStateToProps ({ general, ingame }) {
  const { present, past } = ingame
  const { isDoingMatch } = general
  const awaitCreateSheet = memoAwaitCreateSheet(present.snapshot)
  const sheet = awaitCreateSheet(past)

  return { isDoingMatch, sheet }
}

const ScoreSheetContainer = connect(mapStateToProps)(ScoreSheet)

export default ScoreSheetContainer
