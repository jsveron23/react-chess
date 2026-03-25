import { memo } from 'react';
import { Box } from './box';

const Text = memo(function Text({ children = '', ...props }) {
  return (
    <Box is="p" padding={0} margin={0} {...props}>
      {children}
    </Box>
  );
});

export { Text };
