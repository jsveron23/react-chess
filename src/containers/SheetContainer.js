import { connect } from 'react-redux'
import { curry, compose, map, reverse } from 'ramda'
import { Sheet } from '~/components'
import { alignHistory, alignScoreSheet } from '~/chess/core'

const mergeLineups = curry((presentLineup, pastLineupList) => [
  presentLineup,
  ...pastLineupList
])

const getPastLineup = (pastItem) => pastItem.lineup

const mapStateToProps = ({ ingame }) => {
  const { present, past } = ingame
  const { lineup: presentLineup } = present
  const sheet = compose(
    alignScoreSheet,
    reverse,
    alignHistory,
    mergeLineups(presentLineup),
    map(getPastLineup),
    reverse
  )(past)

  return { sheet }
}

const SheetContainer = connect(mapStateToProps)(Sheet)

export default SheetContainer
