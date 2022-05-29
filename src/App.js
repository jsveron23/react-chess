import Box from 'ui-box';
import { Relative, Flex, FlexRow, FlexCol, Text } from 'ui/es';
import {
  DiagramContainer,
  MenuContainer,
  SheetContainer,
  NotiBarContainer,
} from '~/containers';
import { useTheme } from '~/hooks';
import Logo from '~/assets/logo.svg';
import '~/styles/app.css';

function App() {
  const { diagram, logo, sidebar, fh, border } = useTheme();
  const minMaxWidth = diagram.width + sidebar.width;

  return (
    <FlexRow height={fh} minWidth={minMaxWidth} maxWidth={minMaxWidth}>
      <Relative flexBasis={diagram.width}>
        <DiagramContainer />
      </Relative>

      <Box
        flex="1"
        backgroundColor={sidebar.bg}
        borderLeft={border}
        borderRight={border}
      >
        <FlexCol height="100%" justifyContent="space-between">
          <Text is="h1" textAlign="center" marginTop={30}>
            React-Chess
          </Text>

          <Flex is="figure" justifyContent="center">
            <Logo width={logo.width} height={logo.height} />
          </Flex>

          <Box padding={20} paddingTop={0} paddingBottom={10} marginTop={20}>
            <MenuContainer />
          </Box>

          <Box
            flex="1"
            overflowY="scroll"
            margin={20}
            marginTop={0}
            backgroundColor="#fff"
          >
            <SheetContainer />
          </Box>

          <NotiBarContainer />
        </FlexCol>
      </Box>
    </FlexRow>
  );
}

export default App;
