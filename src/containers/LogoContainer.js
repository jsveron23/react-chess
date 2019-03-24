import { connect } from 'react-redux'
import { Logo } from '~/components'

const TITLE = 'React Chess'

function mapStateToProps ({ general }) {
  const { isDoingMatch } = general

  return { isDoingMatch, title: TITLE }
}

const MenuContainer = connect(mapStateToProps)(Logo)

export default MenuContainer
