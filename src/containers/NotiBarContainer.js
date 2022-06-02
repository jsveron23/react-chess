import { connect } from 'react-redux';
import { NotiBar } from '~/components';

function mapStateToProps({
  network: { connected, awaiting },
  ingame: {
    present: { turn, checkData, thinking = false },
  },
}) {
  return { turn, connected, awaiting, checkData, thinking };
}

export default connect(mapStateToProps)(NotiBar);
