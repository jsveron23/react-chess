import { memo } from 'react';
import PropTypes from 'prop-types';
import { Turn } from 'chess/es';
import { Flex, Text } from 'ui/es';
import { toLocaleDate } from '~/utils';

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

function NotiBar({ turn, lastSaved }) {
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
      {lastSaved && <Text>Last Saved - {toLocaleDate(lastSaved)}</Text>}
    </Flex>
  );
}

NotiBar.propTypes = {
  turn: PropTypes.string.isRequired,
  lastSaved: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

NotiBar.defaultProps = {
  lastSaved: '',
};

export default memo(NotiBar);
