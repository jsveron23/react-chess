import Box from 'ui-box';
import { Relative, Flex, FlexCol, Text } from 'ui/es';
import {
  DiagramContainer,
  MenuContainer,
  SheetContainer,
  NotiBarContainer,
} from '~/containers';
import useTheme from '~/styles/useTheme';
import Logo from '~/assets/logo.svg';
import { Viewport, Sidebar } from '~/layout';
import '~/styles/app.css';

function App() {
  const { diagram, logo } = useTheme();

  return (
    <Viewport>
      <Relative flexBasis={diagram.width}>
        <DiagramContainer />
      </Relative>

      <Sidebar>
        <FlexCol height="100%" justifyContent="space-between">
          <Text is="h1" textAlign="center" marginTop={30}>
            React-Chess
          </Text>

          <Flex is="figure" justifyContent="center">
            <Logo width={logo.width} height={logo.height} />
          </Flex>

          <Box padding={20} marginTop={20}>
            <MenuContainer />
          </Box>

          <Box flex="1" overflowY="scroll" margin={20} backgroundColor="#fff">
            <SheetContainer />
          </Box>

          <NotiBarContainer />
        </FlexCol>
      </Sidebar>
    </Viewport>
  );
}

export default App;
