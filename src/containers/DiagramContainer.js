import { connect } from 'react-redux'
import { compose, prop as extract } from 'ramda'
import { Diagram } from '~/components'
import { setNext, setMovable, setCapturedNext } from '~/actions/ingame'
import {
  getMovableTiles,
  getDirection,
  excludeBlock,
  computeSpecial
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
    if (isExist(selecteSpecial)) {
      const tile = `${selectedFile}${selectedRank}`

      nextMovableAxis = compose(
        extract('movableAxis'),
        computeSpecial(selectedSide, selecteSpecial, tile, snapshot)
      )(movableAxis)
    } else {
      nextMovableAxis = compose(
        excludeBlock(turn, snapshot),
        getDirection
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
