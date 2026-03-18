import {
  Box,
  Relative,
  Flex,
  FlexOne,
  FlexRow,
  FlexCol,
  Text,
  Scroll,
} from 'ui/es';
import {
  DiagramContainer,
  MenuContainer,
  SheetContainer,
  NotiBarContainer,
  AnalysisPanelContainer,
  HintPanelContainer,
} from '~/containers';
import { useTheme, useWindowSize } from '~/hooks';
import Logo from '~/assets/logo.svg';
import '~/styles/app.css';

const App = () => {
  const [, height] = useWindowSize();
  const { sidebar, analysisPanel, hintPanel, logo, fh, border, color } =
    useTheme();
  const minMaxWidth =
    height + sidebar.width + hintPanel.width + analysisPanel.width;

  return (
    <FlexRow height={fh} minWidth={minMaxWidth} maxWidth={minMaxWidth}>
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
            <img
              src={Logo}
              alt="React-Chess Logo"
              width={logo.width}
              height={logo.height}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
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

      <Relative flexBasis={height}>
        <DiagramContainer />
      </Relative>

      <Box
        width={hintPanel.width}
        borderLeft={border}
        borderRight={border}
        borderBottom={border}
        style={{ flexShrink: 0, height: '100%', overflow: 'hidden' }}
      >
        <HintPanelContainer />
      </Box>

      <Box
        width={analysisPanel.width}
        borderLeft={border}
        borderRight={border}
        borderBottom={border}
        style={{ flexShrink: 0, height: '100%', overflow: 'hidden' }}
      >
        <AnalysisPanelContainer />
      </Box>
    </FlexRow>
  );
};

export { App };
