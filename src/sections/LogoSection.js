import React from 'react';
import Box from 'ui-box';
import { Flex, FlexCol } from 'ui/es';
import Logo from '~/assets/logo.svg';
import useTheme from '~/styles/useTheme';

function LogoSection() {
  const { logo } = useTheme();

  return (
    <FlexCol>
      <Box is="h1" textAlign="center" marginTop={30}>
        React-Chess
      </Box>

      <Flex is="figure" justifyContent="center">
        <Logo width={logo.width} height={logo.height} />
      </Flex>
    </FlexCol>
  );
}

export default LogoSection;
