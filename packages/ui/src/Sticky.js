import { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';

const Sticky = forwardRef(function Sticky({ children, ...props }, ref) {
  return (
    <Box ref={ref} position="sticky" top={0} {...props}>
      {children}
    </Box>
  );
});

Sticky.propTypes = {
  children: PropTypes.node,
};

Sticky.defaultProps = {
  children: '',
};

export default memo(Sticky);
