import React from 'react';
import Box from 'ui-box';
import { MenuContainer, DiagramContainer } from '~/containers';
import { Flex, FlexRow, FlexCol } from '~/components';
import Logo from '~/assets/logo.svg';
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

  return (
    <FlexRow height="100vh" minWidth={minMaxWidth} maxWidth={minMaxWidth}>
      <Box flexBasis={width}>
        <DiagramContainer />
      </Box>

      <Box
        flex="1"
        backgroundColor="#e1e1e1"
        borderLeft="1px solid #cacaca"
        borderRight="1px solid #cacaca"
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
