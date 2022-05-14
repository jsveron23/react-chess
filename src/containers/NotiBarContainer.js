import { connect } from 'react-redux';
import { NotiBar } from '~/components';

function mapStateToProps({
  general: { lastSaved },
  ingame: {
    present: { turn },
  },
}) {
  return { turn, lastSaved };
}

export default connect(mapStateToProps)(NotiBar);
