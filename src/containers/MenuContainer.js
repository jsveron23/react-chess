import { connect } from 'react-redux'
import { toggleMatchStatus } from '~/actions/general'
import { Menu } from '~/components'

const mapStateToProps = ({ general }) => {
  const { isMatching } = general
  const items = !isMatching
    ? ['Resume Game', 'Human vs. Human', 'Human vs. CPU']
    : ['Main', 'Undo']

  return { isMatching, items }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (name) => (evt) => {
      evt.preventDefault()

      if (!['Undo', 'Human vs. CPU'].includes(name)) {
        dispatch(toggleMatchStatus())
      }
    }
  }
}

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

export default MenuContainer
