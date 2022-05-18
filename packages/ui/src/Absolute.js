import { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';

const Absolute = forwardRef(function Absolute({ children, ...props }, ref) {
  return (
    <Box ref={ref} position="absolute" {...props}>
      {children}
    </Box>
  );
});

Absolute.propTypes = {
  children: PropTypes.node,
};

Absolute.defaultProps = {
  children: '',
};

export default memo(Absolute);
