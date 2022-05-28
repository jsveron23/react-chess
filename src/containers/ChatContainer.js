import { connect } from 'react-redux';
import { Chat } from '~/components';
import { sendMessage } from '~/store/actions';

function mapStateToProps({ network: { chatData } }) {
  return { data: chatData };
}

export default connect(mapStateToProps, { sendMessage })(Chat);
