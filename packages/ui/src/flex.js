import { memo, forwardRef } from 'react';
import { Box } from './box';

const Flex = memo(
  forwardRef(function Flex({ children, ...props }, ref) {
    return (
      <Box ref={ref} display="flex" {...props}>
        {children}
      </Box>
    );
  })
);

export { Flex };
