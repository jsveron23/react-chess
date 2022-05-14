import PropTypes from 'prop-types';
import Box from 'ui-box';

const Hr = ({ color, ...props }) => {
  return (
    <Box is="span" backgroundColor={color} width="100%" height={1} {...props} />
  );
};

Hr.propTypes = {
  color: PropTypes.string,
};

Hr.defaultProps = {
  color: '#cacaca',
};

export default Hr;
