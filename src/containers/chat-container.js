import { connect } from 'react-redux';
import { Chat } from '~/components';
import { sendMessage } from '~/store/actions';

const mapStateToProps = ({ network: { chatData } }) => ({ data: chatData });

const ChatContainer = connect(mapStateToProps, { sendMessage })(Chat);

export { ChatContainer };
