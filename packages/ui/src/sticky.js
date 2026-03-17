import { memo, forwardRef } from 'react';
import { Box } from './box';

const Sticky = memo(forwardRef(function Sticky({ children = '', ...props }, ref) {
  return (
    <Box ref={ref} position="sticky" top={0} {...props}>
      {children}
    </Box>
  );
}));


export { Sticky };
