import { connect } from 'react-redux'
import { compose, prop } from 'ramda'
import { Diagram } from '~/components'
import { setNext, setMovable, setCapturedNext } from '~/actions/ingame'
import {
  getMovableTiles,
  groupByDirection,
  includeSpecial,
  rejectBlocked
} from '~/chess/core'
import { getSpecial, parseSelected } from '~/chess/helpers'
import { RANKS, FILES } from '~/chess/constants'
import { isExist } from '~/utils'

function mapStateToProps ({ general, ingame }) {
  const { isDoingMatch } = general
  const { present } = ingame
  const { turn, snapshot, selected, movableAxis } = present
  const {
    piece: selectedPiece,
    side: selectedSide,
    file: selectedFile,
    rank: selectedRank
  } = parseSelected(selected, snapshot)
  const selecteSpecial = getSpecial(selectedPiece) || []
  let nextMovableAxis = movableAxis

  if (isExist(movableAxis)) {
    const selectedTile = `${selectedFile}${selectedRank}`

    if (isExist(selecteSpecial)) {
      nextMovableAxis = compose(
        prop('movableAxis'),
        includeSpecial(selectedSide, selecteSpecial, selectedTile, snapshot)
      )(movableAxis)
    } else {
      nextMovableAxis = compose(
        rejectBlocked(turn, snapshot),
        groupByDirection
      )(movableAxis)
    }
  }

  return {
    isDoingMatch,
    turn,
    snapshot,
    selectedPiece,
    selectedSide,
    selectedFile,
    selectedRank,
    ranks: RANKS,
    files: FILES,
    movableTiles: getMovableTiles(nextMovableAxis)
  }
}

const mapDispatchToProps = {
  setMovable,
  setNext,
  setCapturedNext
}

const DiagramContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Diagram)

export default DiagramContainer
