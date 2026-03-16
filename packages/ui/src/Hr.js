import PropTypes from 'prop-types';
import Box from './Box';

const Hr = ({ color = '#cacaca', ...props }) => {
  return (
    <Box is="span" backgroundColor={color} width="100%" height={1} {...props} />
  );
};

Hr.propTypes = {
  color: PropTypes.string,
};


export default Hr;
