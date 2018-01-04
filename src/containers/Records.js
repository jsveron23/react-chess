import { connect } from 'react-redux'
import { Records } from '@components'

/**
 * @param  {Object} state
 * @return {Object}
 */
function mapStateToProps ({ records }) {
  return { records }
}

export default connect(mapStateToProps)(Records)
