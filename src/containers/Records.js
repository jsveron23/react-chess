import { connect } from 'react-redux'
import { Records } from '@components'

function mapStateToProps ({ notations, records }) {
  return { notations, records }
}

export default connect(mapStateToProps)(Records)
