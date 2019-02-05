import { connect } from 'react-redux'
import { Logo } from '~/components'

const TITLE = 'React Chess'

const mapStateToProps = ({ general }) => {
  const { isMatching } = general

  return { isMatching, title: TITLE }
}

const MenuContainer = connect(mapStateToProps)(Logo)

export default MenuContainer
