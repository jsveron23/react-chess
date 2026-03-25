import { memo } from 'react';
import { Box } from './box';

const FlexCol = memo(function FlexCol({ children, ...props }) {
  return (
    <Box display="flex" flexDirection="column" {...props}>
      {children}
    </Box>
  );
});

export { FlexCol };
