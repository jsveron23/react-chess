import { memo } from 'react';
import PropTypes from 'prop-types';
import ClockLoader from 'react-spinners/ClockLoader';
import Text from './Text';

const Loading = ({ loading, text, size, ...props }) => {
  if (!loading) {
    return '';
  }

  return (
    <>
      <Text marginRight={10} {...props}>
        {text}
      </Text>
      <ClockLoader size={size} loading={loading} />
    </>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string,
  size: PropTypes.number,
};

Loading.defaultProps = {
  loading: false,
  text: '',
  size: 10,
};

export default memo(Loading);
