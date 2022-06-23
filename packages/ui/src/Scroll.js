import { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from 'ui-box';

const Scroll = forwardRef(function Scroll({ children, is, ...props }, ref) {
  const C = is || Box;

  return (
    <C ref={ref} is={is} overflowY="scroll" {...props}>
      {children}
    </C>
  );
});

Scroll.propTypes = {
  children: PropTypes.node,
  is: PropTypes.elementType,
};

Scroll.defaultProps = {
  children: '',
  is: '',
};

export default memo(Scroll);
