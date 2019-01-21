import { connect } from 'react-redux'
import { Board } from '~/components'
import { RANKS, FILES } from '~/constants'

const mapStateToProps = ({ general, notations }) => {
  const { isMatching } = general

  return { isMatching, notations, ranks: RANKS, files: FILES }
}

const BoardContainer = connect(mapStateToProps)(Board)

export default BoardContainer
