import { memo, useState, useCallback } from 'react';
import { reverse } from 'ramda';

import { Box, FlexCol, FlexOne, TextBox, Text, Scroll } from 'ui/es';
import { Turn } from 'chess/es';
import { KeyCode } from '~/presets';

const Chat = memo(({ data = [], sendMessage }) => {
  // TODO use redux
  const [text, setText] = useState('');

  const handleChange = useCallback((evt) => setText(evt.target.value), []);
  const handleKeyDown = useCallback(
    (evt) => {
      if (evt.keyCode === KeyCode.enter) {
        sendMessage(text, +new Date());
        setText('');
      }
    },
    [text, sendMessage]
  );

  return (
    <FlexCol width="100%">
      <FlexOne
        is={TextBox}
        padding={5}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="leave message here!"
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
});

export { Chat };
