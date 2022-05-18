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

function NotiBar({ turn, awaiting }) {
  const cs = ColorSet[turn];

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
      {awaiting ? (
        <>
          <Text marginRight={10}>...Awating...</Text>
          <ClockLoader
            size={20}
            loading={awaiting}
            color={ColorSet[turn].color}
          />
        </>
      ) : (
        <Text marginRight={10}>...Your turn...</Text>
      )}
    </Flex>
  );
}

NotiBar.propTypes = {
  turn: PropTypes.string.isRequired,
  awaiting: PropTypes.bool.isRequired,
};

export default memo(NotiBar);
