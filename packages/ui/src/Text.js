import { memo } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';

function Text({ children = '', ...props }) {
  return (
    <Box is="p" padding={0} margin={0} {...props}>
      {children}
    </Box>
  );
}

Text.propTypes = {
  children: PropTypes.node,
};


export default memo(Text);
