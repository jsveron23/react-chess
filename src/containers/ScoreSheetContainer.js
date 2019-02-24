import { connect } from 'react-redux'
import { compose, reverse } from 'ramda'
import { ScoreSheet } from '~/components'
import { createTimeline, createNotation, createScoreSheet } from '~/chess/core'

const mapStateToProps = ({ general, ingame }) => {
  const { present, past } = ingame
  const { isDoingMatch } = general
  const sheet = compose(
    createScoreSheet,
    reverse,
    createNotation,
    createTimeline(present.snapshot)
  )(past)

  return { isDoingMatch, sheet }
}

const ScoreSheetContainer = connect(mapStateToProps)(ScoreSheet)

export default ScoreSheetContainer
