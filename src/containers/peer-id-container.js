import { connect } from 'react-redux';
import { PeerId } from '~/components';

const mapStateToProps = ({ network: { peerId } }) => ({ peerId });

const PeerIdContainer = connect(mapStateToProps)(PeerId);

export { PeerIdContainer };
