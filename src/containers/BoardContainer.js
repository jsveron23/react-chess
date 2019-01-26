import { connect } from 'react-redux'
import { Board } from '~/components'
import { selectPiece, setCurrentMovable, toggleTurn } from '~/actions/general'
import { setNotations } from '~/actions/notations'
import { getMovableTiles } from '~/utils/chess'
import { RANKS, FILES } from '~/constants'

const mapStateToProps = (ranks, files) => ({ general, notations }) => {
  const { isMatching, turn, selected, currentMovableTiles } = general
  const movableTiles = getMovableTiles(currentMovableTiles)

  return {
    isMatching,
    turn,
    selected,
    movableTiles,
    notations,
    ranks,
    files
  }
}

const mapDispatchToProps = {
  selectPiece,
  setCurrentMovable,
  setNotations,
  toggleTurn
}

const BoardContainer = connect(
  mapStateToProps(RANKS, FILES),
  mapDispatchToProps
)(Board)

export default BoardContainer
