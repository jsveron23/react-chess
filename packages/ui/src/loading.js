import { memo } from 'react';
import PropTypes from 'prop-types';
import _ClockLoader from 'react-spinners/ClockLoader';
import { Text } from './text';

const ClockLoader = _ClockLoader?.default ?? _ClockLoader;

const Loading = memo(function Loading({ loading = false, text = '', size = 10, ...props }) {
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
});

Loading.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string,
  size: PropTypes.number,
};

export { Loading };
