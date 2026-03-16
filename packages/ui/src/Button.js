import { memo } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';

const Button = ({ children, disabled = false, ...props }) => {
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
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};


export default memo(Button);
