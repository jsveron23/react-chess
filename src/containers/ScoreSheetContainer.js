import { connect } from 'react-redux'
import { curry, compose, map, reverse } from 'ramda'
import { ScoreSheet } from '~/components'
import { createNotation, applyToScoreSheet } from '~/chess/core'

const combineSnapshotList = curry((presentSnapshot, pastSnapshotList) => [
  presentSnapshot,
  ...pastSnapshotList
])

const mapStateToProps = ({ ingame }) => {
  const { present, past } = ingame
  const { snapshot: presentSnapshot } = present
  const sheet = compose(
    applyToScoreSheet,
    reverse,
    createNotation,
    combineSnapshotList(presentSnapshot),
    map((pastIngame) => pastIngame.snapshot),
    reverse
  )(past)

  return { sheet }
}

const ScoreSheetContainer = connect(mapStateToProps)(ScoreSheet)

export default ScoreSheetContainer
