import { connect } from 'react-redux';
import { NotiBar } from '~/components';

const mapStateToProps = ({
  ai: { thinking },
  ingame: {
    present: { turn, checkData },
  },
}) => ({ turn, checkData, thinking });

const NotiBarContainer = connect(mapStateToProps)(NotiBar);

export { NotiBarContainer };
