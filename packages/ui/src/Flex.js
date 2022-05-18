import { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';

const Flex = forwardRef(function Flex({ children, ...props }, ref) {
  return (
    <Box ref={ref} display="flex" {...props}>
      {children}
    </Box>
  );
});

Flex.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(Flex);
