import React from 'react';
import Box from 'ui-box';
import { DiagramContainer } from '~/containers';
import { Flex, FlexRow, FlexCol, Button } from '~/components';
import Logo from '~/assets/logo.svg';
import '~/styles/app.css';

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
          <FlexCol gap={10} alignItems="center">
            <Button>1 vs 1</Button>
            <Button disabled>1 vs CPU</Button>
            <Button disabled>Import</Button>
            <Button disabled>Export</Button>
            <Button disabled>Observe</Button>
            <Button disabled>Online</Button>
          </FlexCol>
        </Box>

        <Box>Sheet</Box>
      </Box>
    </FlexRow>
  );
}

export default App;
