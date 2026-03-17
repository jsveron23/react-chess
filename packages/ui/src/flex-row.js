import { memo } from 'react';
import { Box } from './box';

const FlexRow = memo(function FlexRow({ children, ...props }) {
  return (
    <Box display="flex" flexDirection="row" {...props}>
      {children}
    </Box>
  );
});


export { FlexRow };
