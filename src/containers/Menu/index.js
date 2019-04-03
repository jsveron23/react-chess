import { connect } from 'react-redux'
import * as R from 'ramda'
import { Menu } from '~/components'
import {
  RESUME_GAME,
  HUMAN_VS_HUMAN,
  HUMAN_VS_CPU,
  MAIN,
  UNDO,
  DISABLED_ITEMS
} from './constants'
import decideActions from './decideActions'

function mapStateToProps ({ general }) {
  const { isDoingMatch } = general
  const items = !isDoingMatch
    ? [RESUME_GAME, HUMAN_VS_HUMAN, HUMAN_VS_CPU]
    : [MAIN, UNDO]

  return {
    isDoingMatch,
    items,
    disabledItems: DISABLED_ITEMS
  }
}

function mapDispatchToProps (dispatch) {
  const onClick = R.compose(
    R.map(dispatch),
    decideActions
  )

  return { onClick }
}

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

export default MenuContainer
