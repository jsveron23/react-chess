import { memo } from 'react';
import Box from 'ui-box';
import { MenuContainer } from '~/containers';

function MenuSection() {
  return (
    <Box padding={20} marginTop={20}>
      <MenuContainer />
    </Box>
  );
}

export default memo(MenuSection);
