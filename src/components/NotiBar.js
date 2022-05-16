import { memo } from 'react';
import PropTypes from 'prop-types';
import { Turn } from 'chess/es';
import { Flex } from 'ui/es';

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

function NotiBar({ turn }) {
  const cs = ColorSet[turn];

  return (
    <Flex
      borderTop="1px solid #cacaca"
      alignItems="center"
      justifyContent="flex-end"
      backgroundColor={cs.bgColor}
      color={cs.color}
      height={40}
      paddingLeft={10}
      paddingRight={10}
    >
      noti here
    </Flex>
  );
}

NotiBar.propTypes = {
  turn: PropTypes.string.isRequired,
};

export default memo(NotiBar);
