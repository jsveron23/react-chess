import Box from 'ui-box';
import { Relative, Flex, FlexOne, FlexRow, FlexCol, Text, Scroll } from 'ui/es';
import {
  DiagramContainer,
  MenuContainer,
  SheetContainer,
  NotiBarContainer,
} from '~/containers';
import { useTheme, useWindowSize } from '~/hooks';
import Logo from '~/assets/logo.svg';
import '~/styles/app.css';

function App() {
  const [, height] = useWindowSize();
  const { sidebar, logo, fh, border, color } = useTheme();
  const minMaxWidth = height + sidebar.width;

  return (
    <FlexRow height={fh} minWidth={minMaxWidth} maxWidth={minMaxWidth}>
      <Relative flexBasis={height}>
        <DiagramContainer />
      </Relative>

      <FlexOne
        backgroundColor={color.gray1}
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

          <Scroll
            is={FlexOne}
            backgroundColor={color.white}
            margin={20}
            marginTop={0}
          >
            <SheetContainer />
          </Scroll>

          <NotiBarContainer />
        </FlexCol>
      </FlexOne>
    </FlexRow>
  );
}

export default App;
