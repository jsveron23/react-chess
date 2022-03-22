import { connect } from 'react-redux';
import { Overlay } from '~/components';

function mapStateToProps({ general: { matchType } }) {
  return { matchType };
}

const OverlayContainer = connect(mapStateToProps)(Overlay);

export default OverlayContainer;
