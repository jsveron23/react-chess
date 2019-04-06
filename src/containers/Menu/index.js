import { connect } from 'react-redux'
import * as R from 'ramda'
import { Menu } from '~/components'
import { MAIN_ITEMS, GAME_ITEMS, DISABLED_ITEMS } from './constants'
import decideActions from './decideActions'

function mapStateToProps ({ general }) {
  const { isDoingMatch } = general
  const items = !isDoingMatch ? MAIN_ITEMS : GAME_ITEMS

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
