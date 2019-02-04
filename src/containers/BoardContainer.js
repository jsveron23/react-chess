import { connect } from 'react-redux'
import { compose } from 'ramda'
import { Board } from '~/components'
import { selectPiece, setCurrentMovable, toggleTurn } from '~/actions/general'
import { setNotations } from '~/actions/notations'
import {
  getPureMovable,
  getSelectedNotation,
  transformMovableAsDirection,
  excludeBlock,
  includeSpecialMovable
} from '~/chess/core'
import { getSpecial } from '~/chess/helpers'
import { RANKS, FILES } from '~/chess/constants'
import { isEmpty, isExist } from '~/utils'

const mapStateToProps = ({ general, notations }) => {
  const { isMatching, turn, selected, currentMovableTiles } = general
  const movableTiles = getPureMovable(currentMovableTiles)
  const {
    selectedPiece,
    selectedSide,
    selectedFile,
    selectedRank
  } = getSelectedNotation(notations, selected)
  const special = getSpecial(selectedPiece)
  const souldExcludeBlock = isEmpty(special) && isExist(movableTiles)
  const isSpecialPiece = isExist(special) && isExist(movableTiles)
  let nextMovableTiles = movableTiles
  let excludeBlockMovable

  if (souldExcludeBlock) {
    excludeBlockMovable = compose(
      excludeBlock(notations),
      transformMovableAsDirection
    )(movableTiles)
  }

  if (isSpecialPiece) {
    const tile = `${selectedFile}${selectedRank}`

    nextMovableTiles = includeSpecialMovable(
      selectedPiece,
      selectedSide,
      special,
      tile,
      movableTiles
    )
  }

  return {
    isMatching,
    turn,
    selected,
    notations,
    ranks: RANKS,
    files: FILES,
    movableTiles: souldExcludeBlock ? excludeBlockMovable : nextMovableTiles
  }
}

const mapDispatchToProps = {
  selectPiece,
  setCurrentMovable,
  setNotations,
  toggleTurn
}

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)

export default BoardContainer
