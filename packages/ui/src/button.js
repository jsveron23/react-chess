import { memo } from 'react';
import { Box } from './box';

const Button = memo(function Button({ children, disabled = false, ...props }) {
  return (
    <Box
      is="button"
      type="button"
      width="100%"
      disabled={disabled ? 'disabled' : ''}
      {...props}
    >
      {children}
    </Box>
  );
});

export { Button };
