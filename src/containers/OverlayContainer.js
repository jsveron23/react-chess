import { connect } from 'react-redux';
import { Overlay } from '~/components';

function mapStateToProps() {
  return {};
}

const OverlayContainer = connect(mapStateToProps)(Overlay);

export default OverlayContainer;
