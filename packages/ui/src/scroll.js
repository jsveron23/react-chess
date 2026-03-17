import { memo, forwardRef } from 'react';
import { Box } from './box';

const Scroll = memo(forwardRef(function Scroll({ children = '', is, ...props }, ref) {
  const C = is || Box;

  return (
    <C ref={ref} overflowY="scroll" {...props}>
      {children}
    </C>
  );
}));


export { Scroll };
