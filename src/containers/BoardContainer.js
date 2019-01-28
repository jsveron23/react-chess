import { connect } from 'react-redux'
import { Board } from '~/components'
import { selectPiece, setCurrentMovable, toggleTurn } from '~/actions/general'
import { setNotations } from '~/actions/notations'
import { isEmpty, isExist } from '~/utils'
import { getPureMovable } from '~/utils/chess' // movableWithDirection
import { RANKS, FILES, SPECIALS } from '~/constants'

const mapStateToProps = ({ ranks, files }) => ({ general, notations }) => {
  const { isMatching, turn, selected, currentMovableTiles } = general
  const movableTiles = getPureMovable(currentMovableTiles)
  const [selectedTile] = selected.split('-')
  const [, selectedPiece] = notations.filter((notation) => {
    return notation.indexOf(selectedTile) > -1
  })
  const special = SPECIALS[selectedPiece]

  if (isEmpty(special) && isExist(movableTiles)) {
    // const movable = movableWithDirection(movableTiles)
    // console.log(movable)
  }

  return {
    isMatching,
    turn,
    selected,
    notations,
    ranks,
    files,
    movableTiles
  }
}

const mapDispatchToProps = {
  selectPiece,
  setCurrentMovable,
  setNotations,
  toggleTurn
}

const BoardContainer = connect(
  mapStateToProps({ ranks: RANKS, files: FILES }),
  mapDispatchToProps
)(Board)

export default BoardContainer
