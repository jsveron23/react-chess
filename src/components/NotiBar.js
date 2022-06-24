import { memo } from 'react';
import PropTypes from 'prop-types';
import { Flex, FlexOne, FlexRow, Text, Loading } from 'ui/es';
import { useTheme } from '~/hooks';

function NotiBar({ turn, connected, awaiting, thinking }) {
  const { border, color } = useTheme();
  const cs = color.reflect[turn];
  const isAwaiting = connected && awaiting;
  const isTurn = connected && !awaiting;

  return (
    <FlexRow borderTop={border}>
      <Flex
        flexBasis={30}
        alignItems="center"
        justifyContent="center"
        backgroundColor={cs.bgColor}
        color={cs.color}
        textTransform="uppercase"
        fontWeight="bold"
        borderRight={border}
      >
        {cs.text}
      </Flex>

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
