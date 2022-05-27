import { connect } from 'react-redux';
import { NotiBar } from '~/components';

function mapStateToProps({
  network: { connected, awaiting },
  ingame: {
    present: { turn, checkData },
  },
}) {
  return { turn, connected, awaiting, checkData };
}

export default connect(mapStateToProps)(NotiBar);
