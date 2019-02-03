import { connect } from 'react-redux'
import { Board } from '~/components'
import { selectPiece, setCurrentMovable, toggleTurn } from '~/actions/general'
import { setNotations } from '~/actions/notations'
import { isEmpty, isExist } from '~/utils'
import { getPureMovable, getSelectedNotation } from '~/chess/core'
import { getSpecial } from '~/chess/helpers'
import { RANKS, FILES } from '~/chess/constants'

const mapStateToProps = ({ general, notations }) => {
  const { isMatching, turn, selected, currentMovableTiles } = general
  const movableTiles = getPureMovable(currentMovableTiles)

  return {
    isMatching,
    turn,
    selected,
    notations,
    movableTiles
  }
}

const mapDispatchToProps = {
  selectPiece,
  setCurrentMovable,
  setNotations,
  toggleTurn
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { selected, notations, movableTiles } = stateProps
  const { selectedPiece } = getSelectedNotation(notations, selected)
  const special = getSpecial(selectedPiece)

  if (isEmpty(special) && isExist(movableTiles)) {
    // direction
  }

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    ranks: RANKS,
    files: FILES
  }
}

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Board)

export default BoardContainer
