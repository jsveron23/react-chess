import { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';

const Scroll = forwardRef(function Scroll({ children = '', is, ...props }, ref) {
  const C = is || Box;

  return (
    <C ref={ref} overflowY="scroll" {...props}>
      {children}
    </C>
  );
});

Scroll.propTypes = {
  children: PropTypes.node,
  is: PropTypes.elementType,
};


export default memo(Scroll);
