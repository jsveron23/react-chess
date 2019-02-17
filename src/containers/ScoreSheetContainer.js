import { connect } from 'react-redux'
import { curry, compose, map, reverse, prop as extract } from 'ramda'
import { ScoreSheet } from '~/components'
import { createNotation, createScoreSheet } from '~/chess/core'

const combineSnapshotList = curry((presentSnapshot, pastSnapshotList) => [
  presentSnapshot,
  ...pastSnapshotList
])

const mapStateToProps = ({ general, ingame }) => {
  const { present } = ingame
  const { isDoingMatch } = general
  const { snapshot: presentSnapshot } = present
  const sheet = compose(
    createScoreSheet,
    reverse,
    createNotation,
    combineSnapshotList(presentSnapshot),
    map((pastIngame) => pastIngame.snapshot),
    reverse,
    extract('past')
  )(ingame)

  return { isDoingMatch, sheet }
}

const ScoreSheetContainer = connect(mapStateToProps)(ScoreSheet)

export default ScoreSheetContainer
