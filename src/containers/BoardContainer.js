import { connect } from 'react-redux'
import { Board } from '~/components'
import { RANKS, FILES } from '~/constants'

const mapStateToProps = (ranks, files) => ({ general, notations }) => {
  const { isMatching } = general

  return { isMatching, notations, ranks, files }
}

const BoardContainer = connect(mapStateToProps(RANKS, FILES))(Board)

export default BoardContainer
