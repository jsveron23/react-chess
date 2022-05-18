import { connect } from 'react-redux';
import { NotiBar } from '~/components';

function mapStateToProps({
  network: { connected, awaiting },
  ingame: {
    present: { turn },
  },
}) {
  return { turn, connected, awaiting };
}

export default connect(mapStateToProps)(NotiBar);
