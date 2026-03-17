import { memo } from 'react';
import { Flex } from './flex';

const FlexMiddle = memo(function FlexMiddle({ children, ...props }) {
  return (
    <Flex justifyContent="center" alignItems="center" {...props}>
      {children}
    </Flex>
  );
});


export { FlexMiddle };
