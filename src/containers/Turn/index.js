import { connect } from 'react-redux'
import { Turn } from '~/components'

function mapStateToProps ({ general, ingame }) {
  const { present } = ingame
  const { isDoingMatch } = general
  const { turn } = present

  return { isDoingMatch, turn }
}

const TurnContainer = connect(mapStateToProps)(Turn)

export default TurnContainer
