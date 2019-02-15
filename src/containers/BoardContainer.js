import { connect } from 'react-redux'
import { compose, prop as extract } from 'ramda'
import { Board } from '~/components'
import {
  setLineup,
  setNext,
  setMovable,
  setCapturedNext
} from '~/actions/ingame'
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
  const { isMatching } = general
  const { present } = ingame
  const { turn, lineup, selected, movableAxis } = present
  const {
    piece: selectedPiece,
    side: selectedSide,
    file: selectedFile,
    rank: selectedRank
  } = parseSelected(selected, lineup)
  const selecteSpecial = getSpecial(selectedPiece) || []
  let nextMovableAxis = []

  if (isExist(movableAxis)) {
    if (isExist(selecteSpecial)) {
      const tile = `${selectedFile}${selectedRank}`

      nextMovableAxis = compose(
        extract('movableAxis'),
        computeSpecial(selectedSide, selecteSpecial, tile, lineup)
      )(movableAxis)
    } else {
      nextMovableAxis = compose(
        excludeBlock(turn, lineup),
        getDirection
      )(movableAxis)
    }
  }

  return {
    isMatching,
    turn,
    selectedPiece,
    selectedSide,
    selectedFile,
    selectedRank,
    lineup,
    ranks: RANKS,
    files: FILES,
    movableTiles: getMovableTiles(nextMovableAxis)
  }
}

const mapDispatchToProps = {
  setLineup,
  setMovable,
  setNext,
  setCapturedNext
}

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)

export default BoardContainer
