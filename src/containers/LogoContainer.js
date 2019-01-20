import { connect } from 'react-redux'
import { Logo } from '~/components'

const mapStateToProps = ({ general }) => {
  const title = 'React Chess'
  const { isMatching } = general

  return { isMatching, title }
}

const MenuContainer = connect(mapStateToProps)(Logo)

export default MenuContainer
