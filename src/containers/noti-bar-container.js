import { connect } from 'react-redux';
import { NotiBar } from '~/components';

const mapStateToProps = ({
  ai: { thinking },
  network: { connected, awaiting },
  ingame: {
    present: { turn, checkData },
  },
}) => ({ turn, connected, awaiting, checkData, thinking });

const NotiBarContainer = connect(mapStateToProps)(NotiBar);

export { NotiBarContainer };
