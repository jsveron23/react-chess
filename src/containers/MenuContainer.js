import { connect } from 'react-redux'
import { curry } from 'ramda'
import { toggleMatchStatus } from '~/actions/general'
import { Menu } from '~/components'

const MAIN_MENU = ['Resume Game', 'Human vs. Human', 'Human vs. CPU']
const GAME_MENU = ['Main', 'Undo']
const DISABLED_MENU = ['Undo', 'Human vs. CPU']

const mapStateToProps = ({ general }) => {
  const { isMatching } = general
  const items = !isMatching ? MAIN_MENU : GAME_MENU

  return { isMatching, items }
}

const mapDispatchToProps = (dispatch) => {
  const onClick = (name, evt) => {
    evt.preventDefault()

    if (!DISABLED_MENU.includes(name)) {
      dispatch(toggleMatchStatus())
    }
  }

  return {
    onClick: curry(onClick)
  }
}

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

export default MenuContainer
