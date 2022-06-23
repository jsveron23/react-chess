import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { reverse } from 'ramda';
import Box from 'ui-box';
import { FlexCol, FlexOne, TextBox, Text, Scroll } from 'ui/es';
import { Turn } from 'chess/es';

const KeyCode = {
  enter: 13,
};

const Chat = ({ data, sendMessage }) => {
  // TODO use redux
  const [text, setText] = useState('');

  return (
    <FlexCol width="100%">
      <FlexOne
        is={TextBox}
        placeholder="leave message here!"
        padding={5}
        value={text}
        onChange={(evt) => setText(evt.target.value)}
        onKeyDown={(evt) => {
          if (evt.keyCode === KeyCode.enter) {
            sendMessage(text, +new Date());
            setText('');
          }
        }}
      />
      <Scroll is="ul" height={60} margin={10} padding={0} listStyle="none">
        {reverse(data).map(({ side, message }, idx) => {
          // TODO color
          return (
            <Box is="li" key={idx}>
              <Text>
                [{Turn[side]}] {message}
              </Text>
            </Box>
          );
        })}
      </Scroll>
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
