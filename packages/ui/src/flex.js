import { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box } from './box';

const Flex = memo(forwardRef(function Flex({ children, ...props }, ref) {
  return (
    <Box ref={ref} display="flex" {...props}>
      {children}
    </Box>
  );
}));

Flex.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Flex };
