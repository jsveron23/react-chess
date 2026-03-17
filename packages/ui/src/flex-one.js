import { memo, forwardRef } from 'react';
import { Box } from './box';

const FlexOne = memo(forwardRef(function FlexOne({ children = '', is, ...props }, ref) {
  const C = is || Box;

  return (
    <C ref={ref} flex="1" {...props}>
      {children}
    </C>
  );
}));


export { FlexOne };
