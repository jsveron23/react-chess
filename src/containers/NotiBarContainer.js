import { connect } from 'react-redux';
import { NotiBar } from '~/components';

function mapStateToProps({
  general: { thinking = false },
  network: { connected, awaiting },
  ingame: {
    present: { turn, checkData },
  },
}) {
  return { turn, connected, awaiting, checkData, thinking };
}

export default connect(mapStateToProps)(NotiBar);
