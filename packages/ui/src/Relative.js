import { memo } from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';

function Relative({ children, ...props }) {
  return (
    <Box position="relative" {...props}>
      {children}
    </Box>
  );
}

Relative.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(Relative);
