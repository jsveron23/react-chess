import Box from 'ui-box';
import { Relative, Flex, FlexCol, Text } from 'ui/es';
import { DiagramContainer, MenuContainer } from '~/containers';
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
        <FlexCol>
          <Text is="h1" textAlign="center" marginTop={30}>
            React-Chess
          </Text>

          <Flex is="figure" justifyContent="center">
            <Logo width={logo.width} height={logo.height} />
          </Flex>
        </FlexCol>

        <Box padding={20} marginTop={20}>
          <MenuContainer />
        </Box>

        <Box>Sheet</Box>
      </Sidebar>
    </Viewport>
  );
}

export default App;
