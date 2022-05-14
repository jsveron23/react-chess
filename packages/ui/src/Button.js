import { memo } from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';

const Button = ({ children, disabled, ...props }) => {
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

Button.defaultProps = {
  disabled: false,
};

export default memo(Button);
