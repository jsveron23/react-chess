import { connect } from 'react-redux'
import { Board } from '~/components'
import { selectPiece, setCurrentMovable, toggleTurn } from '~/actions/general'
import { setNotations } from '~/actions/notations'
import { isEmpty, isExist } from '~/utils'
import { getPureMovable, parseSelected } from '~/utils/chess' // transformMovableAsDirection
import { RANKS, FILES, SPECIALS } from '~/constants'

const mapStateToProps = ({ general, notations }) => {
  const { isMatching, turn, selected, currentMovableTiles } = general
  const movableTiles = getPureMovable(currentMovableTiles)
  const { selectedTile } = parseSelected(selected)
  const [, selectedPiece] = notations.filter((notation) => {
    return notation.indexOf(selectedTile) > -1
  })
  const special = SPECIALS[selectedPiece]

  if (isEmpty(special) && isExist(movableTiles)) {
    // const movable = transformMovableAsDirection(movableTiles)
    // console.log(movable)
  }

  return {
    isMatching,
    turn,
    selected,
    notations,
    movableTiles,
    ranks: RANKS,
    files: FILES
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
