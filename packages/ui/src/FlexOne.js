import { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';

const FlexOne = forwardRef(function FlexOne({ children, is, ...props }, ref) {
  const C = is || Box;

  return (
    <C ref={ref} flex="1" {...props}>
      {children}
    </C>
  );
});

FlexOne.propTypes = {
  children: PropTypes.node,
  is: PropTypes.elementType,
};

FlexOne.defaultProps = {
  children: '',
  is: '',
};

export default memo(FlexOne);
