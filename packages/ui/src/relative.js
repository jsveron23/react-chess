import { memo } from 'react';
import { Box } from './box';

const Relative = memo(function Relative({ children = '', ...props }) {
  return (
    <Box position="relative" {...props}>
      {children}
    </Box>
  );
});

export { Relative };
