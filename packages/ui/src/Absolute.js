import { memo } from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';

function Absolute({ children, ...props }) {
  return (
    <Box position="absolute" {...props}>
      {children}
    </Box>
  );
}

Absolute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(Absolute);
