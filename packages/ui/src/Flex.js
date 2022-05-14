import { memo } from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';

const Flex = ({ children, ...props }) => {
  return (
    <Box display="flex" {...props}>
      {children}
    </Box>
  );
};

Flex.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(Flex);
