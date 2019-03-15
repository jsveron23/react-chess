import { connect } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import { Menu } from '~/components'
import { toggleMatchStatus } from '~/actions/general'
import { restartGame } from '~/actions/ingame'

const RESUME_GAME = 'Resume Game'
const HUMAN_VS_HUMAN = 'Human vs. Human'
const HUMAN_VS_CPU = 'Human vs. CPU'
const MAIN = 'Main'
const UNDO = 'Undo'

const MAIN_ITEMS = [RESUME_GAME, HUMAN_VS_HUMAN, HUMAN_VS_CPU]
const GAME_ITEMS = [MAIN, UNDO]
const DISABLED_ITEMS = [HUMAN_VS_CPU]

const mapStateToProps = ({ general }) => {
  const { isDoingMatch } = general
  const items = !isDoingMatch ? MAIN_ITEMS : GAME_ITEMS

  return {
    disabledItems: DISABLED_ITEMS,
    isDoingMatch,
    items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (name) => (evt) => {
      evt.preventDefault()

      if (name === UNDO) {
        dispatch(ActionCreators.undo())

        return
      }

      if (name === HUMAN_VS_HUMAN) {
        const shouldRestart = window.confirm('Restart game?')

        if (!shouldRestart) {
          return
        }

        dispatch(restartGame(/* TODO: save */))
        dispatch(ActionCreators.clearHistory())
      }

      if (!DISABLED_ITEMS.includes(name)) {
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
