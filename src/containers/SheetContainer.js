import { connect } from 'react-redux'
import { compose, map, reverse } from 'ramda'
import { Sheet } from '~/components'
import { alignHistory, alignScoreSheet } from '~/chess/core'

const mergeLineupList = (presentLineup) => (pastLineupList) => [
  presentLineup,
  ...pastLineupList
]

const mapStateToProps = ({ ingame }) => {
  const { present, past } = ingame
  const sheet = compose(
    alignScoreSheet,
    reverse,
    alignHistory,
    mergeLineupList(present.lineup),
    map((item) => item.lineup),
    reverse
  )(past)

  return { sheet }
}

const SheetContainer = connect(mapStateToProps)(Sheet)

export default SheetContainer
