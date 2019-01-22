import { connect } from 'react-redux'
import { Board } from '~/components'
import { selectPiece } from '~/actions/general'
import { RANKS, FILES } from '~/constants'

const mapStateToProps = (ranks, files) => ({ general, notations }) => {
  const { isMatching, turn, selected } = general

  return { isMatching, turn, selected, notations, ranks, files }
}

const mapDispatchToProps = { selectPiece }

const BoardContainer = connect(
  mapStateToProps(RANKS, FILES),
  mapDispatchToProps
)(Board)

export default BoardContainer
