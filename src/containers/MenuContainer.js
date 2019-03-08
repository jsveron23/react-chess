import { connect } from 'react-redux'
import * as R from 'ramda'
import { ActionCreators } from 'redux-undo'
import { toggleMatchStatus } from '~/actions/general'
import { Menu } from '~/components'

const RESUME_GAME = 'Resume Game'
const HUMAN_VS_HUMAN = 'Human vs. Human'
const HUMAN_VS_CPU = 'Human vs. CPU'
const MAIN = 'Main'
const UNDO = 'Undo'

const MAIN_MENU = [RESUME_GAME, HUMAN_VS_HUMAN, HUMAN_VS_CPU]
const GAME_MENU = [MAIN, UNDO]
const DISABLED_MENU = [HUMAN_VS_CPU]

const mapStateToProps = ({ general }) => {
  const { isDoingMatch } = general
  const items = !isDoingMatch ? MAIN_MENU : GAME_MENU

  return { isDoingMatch, items }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: R.curry((name, evt) => {
      evt.preventDefault()

      if (name === UNDO) {
        dispatch(ActionCreators.undo())

        return
      }

      if (!R.includes(name, DISABLED_MENU)) {
        dispatch(toggleMatchStatus())
      }
    })
  }
}

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

export default MenuContainer
