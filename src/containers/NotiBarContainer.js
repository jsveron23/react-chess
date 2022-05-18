import { connect } from 'react-redux';
import { NotiBar } from '~/components';

function mapStateToProps({
  general: { lastSaved },
  network: { awaiting },
  ingame: {
    present: { turn },
  },
}) {
  return { turn, lastSaved, awaiting };
}

export default connect(mapStateToProps)(NotiBar);
