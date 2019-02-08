import { connect } from 'react-redux'
import { curry, compose, map, reverse } from 'ramda'
import { Sheet } from '~/components'
import { alignHistory, alignScoreSheet } from '~/chess/core'

const mergeLineups = curry((presentLineup, pastLineupList) => [
  presentLineup,
  ...pastLineupList
])

const mapStateToProps = ({ ingame }) => {
  const { present, past } = ingame
  const sheet = compose(
    alignScoreSheet,
    reverse,
    alignHistory,
    mergeLineups(present.lineup),
    map((pastItem) => pastItem.lineup),
    reverse
  )(past)

  return { sheet }
}

const SheetContainer = connect(mapStateToProps)(Sheet)

export default SheetContainer
