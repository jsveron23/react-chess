import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from './box';

const FlexCol = memo(function FlexCol({ children, ...props }) {
  return (
    <Box display="flex" flexDirection="column" {...props}>
      {children}
    </Box>
  );
});

FlexCol.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FlexCol };
