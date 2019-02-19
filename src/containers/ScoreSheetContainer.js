import { connect } from 'react-redux'
import { curry, compose, map, reverse, prop } from 'ramda'
import { ScoreSheet } from '~/components'
import { createNotation, createScoreSheet } from '~/chess/core'

const createTimeline = curry((presentSnapshot, pastSnapshotList) => [
  presentSnapshot,
  ...pastSnapshotList
])

const mapStateToProps = ({ general, ingame }) => {
  const { present } = ingame
  const { isDoingMatch } = general
  const sheet = compose(
    createScoreSheet,
    reverse,
    createNotation,
    createTimeline(present.snapshot),
    map((pastIngame) => pastIngame.snapshot),
    reverse,
    prop('past')
  )(ingame)

  return { isDoingMatch, sheet }
}

const ScoreSheetContainer = connect(mapStateToProps)(ScoreSheet)

export default ScoreSheetContainer
