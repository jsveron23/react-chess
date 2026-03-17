import { memo, forwardRef } from 'react';
import { Box } from './box';

const Absolute = memo(forwardRef(function Absolute(
  { children = '', ...props },
  ref
) {
  return (
    <Box ref={ref} position="absolute" {...props}>
      {children}
    </Box>
  );
}));


export { Absolute };
