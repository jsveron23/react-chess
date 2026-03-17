import { memo } from 'react';
import PropTypes from 'prop-types';
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

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

export { Button };
