import { connect } from 'react-redux'
import { Menu } from '@components'
import {
  setScreen,
  setCommand
} from '@actions/general'

function mapStateToProps ({ general }) {
  const { screen } = general
  const isPlaying = screen !== 'main'

  return { isPlaying }
}

function mapDispatchToProps (dispatch) {
  return {
    onClick (evt) {
      evt.preventDefault()

      const { target } = evt
      const action = target.getAttribute('data-action')

      switch (action) {
        case 'main': {
          dispatch(setCommand(''))
          dispatch(setScreen(action))

          break
        }

        case '2p': {
          dispatch(setCommand(''))
          dispatch(setScreen(action))

          break
        }

        case 'undo': {
          dispatch(setCommand('undo'))

          break
        }
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
