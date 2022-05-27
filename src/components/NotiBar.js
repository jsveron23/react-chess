import { memo } from 'react';
import PropTypes from 'prop-types';
import ClockLoader from 'react-spinners/ClockLoader';
import { Turn, Side } from 'chess/es';
import { Flex, FlexRow, Text } from 'ui/es';

const ColorSet = {
  [Turn.w]: {
    bgColor: '#fff',
    color: '#000',
    text: Side[Turn.w],
  },
  [Turn.b]: {
    bgColor: '#000',
    color: '#fff',
    text: Side[Turn.b],
  },
};

function NotiBar({ turn, connected, awaiting }) {
  const cs = ColorSet[turn];
  const isAwaiting = connected && awaiting;
  const isTurn = connected && !awaiting;

  return (
    <FlexRow borderTop="1px solid #cacaca">
      <Flex
        flexBasis={30}
        alignItems="center"
        justifyContent="center"
        backgroundColor={cs.bgColor}
        color={cs.color}
        textTransform="uppercase"
        fontWeight="bold"
        borderRight="1px solid #cacaca"
      >
        {cs.text}
      </Flex>
      <Flex
        flex="1"
        alignItems="center"
        justifyContent="flex-start"
        backgroundColor="#cacaca"
        color="#000"
        height={40}
        paddingLeft={10}
        paddingRight={10}
      >
        {isAwaiting && (
          <>
            <Text marginRight={10}>...Awaiting...</Text>
            <ClockLoader size={20} loading={awaiting} />
          </>
        )}

        {isTurn && <Text marginRight={10}>...Your turn...</Text>}
      </Flex>
    </FlexRow>
  );
}

NotiBar.propTypes = {
  turn: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
  awaiting: PropTypes.bool.isRequired,
};

export default memo(NotiBar);
