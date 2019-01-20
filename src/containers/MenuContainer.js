import { connect } from 'react-redux'
import { setMatchStatus } from '~/actions/general'
import { Menu } from '~/components'

const mapStateToProps = ({ general }) => {
  const { isMatching } = general
  const items = !isMatching
    ? ['Resume', 'Human vs. Human', 'Human vs. CPU']
    : ['Main', 'Undo']

  return { isMatching, items }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (name) => (evt) => {
      evt.preventDefault()

      if (name !== 'Undo') {
        dispatch(setMatchStatus())
      }
    }
  }
}

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

export default MenuContainer
