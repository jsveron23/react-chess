import { memo } from 'react';
import PropTypes from 'prop-types';
import ClockLoader from 'react-spinners/ClockLoader';
import { Turn } from 'chess/es';
import { Flex, Text } from 'ui/es';

const ColorSet = {
  [Turn.w]: {
    bgColor: '#fff',
    color: '#000',
  },
  [Turn.b]: {
    bgColor: '#000',
    color: '#fff',
  },
};

function NotiBar({ turn, connected, awaiting }) {
  const cs = ColorSet[turn];
  const isAwaiting = connected && awaiting;
  const isTurn = connected && !awaiting;

  return (
    <Flex
      borderTop="1px solid #cacaca"
      alignItems="center"
      justifyContent="flex-start"
      backgroundColor={cs.bgColor}
      color={cs.color}
      height={40}
      paddingLeft={10}
      paddingRight={10}
    >
      {isAwaiting && (
        <>
          <Text marginRight={10}>...Awaiting...</Text>
          <ClockLoader
            size={20}
            loading={awaiting}
            color={ColorSet[turn].color}
          />
        </>
      )}

      {isTurn && <Text marginRight={10}>...Your turn...</Text>}
    </Flex>
  );
}

NotiBar.propTypes = {
  turn: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
  awaiting: PropTypes.bool.isRequired,
};

export default memo(NotiBar);
