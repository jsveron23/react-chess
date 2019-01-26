import { connect } from 'react-redux'
import { Board } from '~/components'
import { selectPiece, setCurrentMovable } from '~/actions/general'
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

const mapDispatchToProps = { selectPiece, setCurrentMovable }

const BoardContainer = connect(
  mapStateToProps(RANKS, FILES),
  mapDispatchToProps
)(Board)

export default BoardContainer
