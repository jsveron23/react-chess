import { connect } from 'react-redux'
import { Turn } from '@components'

function mapStateToProps ({ general }) {
  const { screen, turn } = general
  const isPlaying = screen !== 'main'

  return { isPlaying, turn }
}

export default connect(mapStateToProps)(Turn)
