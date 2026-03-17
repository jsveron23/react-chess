import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from './box';

const FlexRow = memo(function FlexRow({ children, ...props }) {
  return (
    <Box display="flex" flexDirection="row" {...props}>
      {children}
    </Box>
  );
});

FlexRow.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FlexRow };
