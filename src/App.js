import React from 'react';
import Box from 'ui-box';
import { Flex, FlexRow, FlexCol } from 'ui/es';
import {
  MenuContainer,
  OverlayContainer,
  DiagramContainer,
} from '~/containers';
import Logo from '~/assets/logo.svg';
import useTheme from '~/styles/useTheme';
import '~/styles/app.css';

/**
 * TODO
 * 1. Load game
 * 2. Check localstorage for checking save file
 * 3. If not, automatically get started 1 vs 1
 */

function App() {
  const width = window.innerHeight;
  const minMaxWidth = width + 300;

  const { sidebar, border } = useTheme();

  return (
    <FlexRow height="100vh" minWidth={minMaxWidth} maxWidth={minMaxWidth}>
      <Box flexBasis={width} position="relative">
        <OverlayContainer />
        <DiagramContainer />
      </Box>

      <Box
        flex="1"
        backgroundColor={sidebar.bg}
        borderLeft={border}
        borderRight={border}
      >
        <FlexCol>
          <Box is="h1" textAlign="center" marginTop={30}>
            React-Chess
          </Box>

          <Flex is="figure" justifyContent="center">
            <Logo width="100px" height="100%" />
          </Flex>
        </FlexCol>

        <Box padding={20} marginTop={20}>
          <MenuContainer />
        </Box>

        <Box>Sheet</Box>
      </Box>
    </FlexRow>
  );
}

export default App;
