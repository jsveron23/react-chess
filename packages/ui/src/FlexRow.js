import { memo } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';

const FlexRow = ({ children, ...props }) => {
  return (
    <Box display="flex" flexDirection="row" {...props}>
      {children}
    </Box>
  );
};

FlexRow.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(FlexRow);
