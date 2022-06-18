import { memo } from 'react';
import PropTypes from 'prop-types';
// import ClockLoader from 'react-spinners/ClockLoader';
import { Turn, Side } from 'chess/es';
import { Flex, FlexRow, Text, Loading } from 'ui/es';

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

function NotiBar({ turn, connected, awaiting, thinking }) {
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
        <Loading text="...Thinking..." size={20} loading={thinking} />
        <Loading text="...Awaiting..." size={20} loading={isAwaiting} />

        {isTurn && <Text marginRight={10}>...Your turn...</Text>}
      </Flex>
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
