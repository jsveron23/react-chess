import { memo } from 'react';
import PropTypes from 'prop-types';
import { Flex, FlexOne, FlexRow, FlexMiddle, Text, Loading } from 'ui/es';
import { useTheme } from '~/hooks';

function NotiBar({ turn, connected, awaiting, thinking }) {
  const { border, color, weight } = useTheme();
  const cs = color.invert[turn];
  const isAwaiting = connected && awaiting;
  const isTurn = connected && !awaiting;

  return (
    <FlexRow borderTop={border}>
      <FlexMiddle
        flexBasis={30}
        backgroundColor={cs.bgColor}
        color={cs.color}
        textTransform="uppercase"
        fontWeight={weight.bold}
        borderRight={border}
      >
        {turn.substring(0, 1)}
      </FlexMiddle>

      <FlexOne
        is={Flex}
        alignItems="center"
        justifyContent="flex-start"
        backgroundColor={color.gray3}
        color={color.black}
        height={40}
        paddingLeft={10}
        paddingRight={10}
      >
        <Loading text="...Thinking..." size={20} loading={thinking} />
        <Loading text="...Awaiting..." size={20} loading={isAwaiting} />

        {isTurn && <Text marginRight={10}>...Your turn...</Text>}
      </FlexOne>
    </FlexRow>
  );
}

NotiBar.propTypes = {
  turn: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
  awaiting: PropTypes.bool.isRequired,
  thinking: PropTypes.bool.isRequired,
};

export default memo(NotiBar);
