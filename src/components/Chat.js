import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { reverse } from 'ramda';
import Box from 'ui-box';
import { FlexCol } from 'ui/es';
import { Turn } from 'chess/es';

const Chat = ({ data, sendMessage }) => {
  const [text, setText] = useState('');

  return (
    <FlexCol width="100%">
      <Box
        is="input"
        flex="1"
        placeholder="leave message here!"
        padding={5}
        value={text}
        onChange={(evt) => setText(evt.target.value)}
        onKeyDown={(evt) => {
          if (evt.keyCode === 13) {
            sendMessage(text, +new Date());
            setText('');
          }
        }}
      />
      <Box
        is="ul"
        height={60}
        margin={10}
        padding={0}
        listStyle="none"
        overflow="scroll"
      >
        {reverse(data).map(({ side, message }, idx) => {
          return (
            <Box is="li" key={idx}>
              [{Turn[side]}] {message}
            </Box>
          );
        })}
      </Box>
    </FlexCol>
  );
};

Chat.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      side: PropTypes.string,
      message: PropTypes.string,
    })
  ),
};

Chat.defaultProps = {
  data: [],
};

export default memo(Chat);
