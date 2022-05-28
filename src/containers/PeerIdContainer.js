import { connect } from 'react-redux';
import { PeerId } from '~/components';

function mapStateToProps({ network: { peerId } }) {
  return { peerId };
}

export default connect(mapStateToProps)(PeerId);
