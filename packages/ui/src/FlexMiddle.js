import { memo } from 'react';
import PropTypes from 'prop-types';
import Flex from './Flex';

const FlexMiddle = ({ children, ...props }) => {
  return (
    <Flex justifyContent="center" alignItems="center" {...props}>
      {children}
    </Flex>
  );
};

FlexMiddle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(FlexMiddle);
