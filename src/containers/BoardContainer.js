import { connect } from 'react-redux'
import { compose } from 'ramda'
import { Board } from '~/components'
import { selectPiece, setCurrentMovable, toggleTurn } from '~/actions/general'
import { setNotations } from '~/actions/notations'
import {
  getPureMovable,
  getSelectedNotation,
  transformMovableAsDirection,
  excludeBlock
} from '~/chess/core'
import { getSpecial } from '~/chess/helpers'
import { RANKS, FILES } from '~/chess/constants'
import { isEmpty, isExist } from '~/utils'

const mapStateToProps = ({ general, notations }) => {
  const { isMatching, turn, selected, currentMovableTiles } = general
  const movableTiles = getPureMovable(currentMovableTiles)
  const { selectedPiece } = getSelectedNotation(notations, selected)
  const special = getSpecial(selectedPiece)
  const souldExcludeBlock = isEmpty(special) && isExist(movableTiles)
  let excludeBlockMovable

  if (souldExcludeBlock) {
    excludeBlockMovable = compose(
      excludeBlock(notations),
      transformMovableAsDirection
    )(movableTiles)
  }

  return {
    isMatching,
    turn,
    selected,
    notations,
    ranks: RANKS,
    files: FILES,
    movableTiles: souldExcludeBlock ? excludeBlockMovable : movableTiles
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
