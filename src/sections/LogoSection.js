import { memo } from 'react';
import { Flex, FlexCol, Text } from 'ui/es';
import Logo from '~/assets/logo.svg';
import useTheme from '~/styles/useTheme';

function LogoSection() {
  const { logo } = useTheme();

  return (
    <FlexCol>
      <Text is="h1" textAlign="center" marginTop={30}>
        React-Chess
      </Text>

      <Flex is="figure" justifyContent="center">
        <Logo width={logo.width} height={logo.height} />
      </Flex>
    </FlexCol>
  );
}

export default memo(LogoSection);
