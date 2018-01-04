import { connect } from 'react-redux'
import { Menu } from '@components'
import { setScreen, setCommand, setPlaying } from '@actions/general'

/**
 * @param  {Object} state
 * @return {Object}
 */
function mapStateToProps ({ general }) {
  const { screen } = general
  const isPlaying = screen !== 'main'

  return { isPlaying }
}

export default connect(mapStateToProps, {
  setScreen,
  setCommand,
  setPlaying
})(Menu)
