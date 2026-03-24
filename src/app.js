import { useSelector } from 'react-redux';
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
import { Diagram, Menu, Sheet, NotiBar, AnalysisPanel } from '~/components';
import { useTheme, useWindowSize } from '~/hooks';
import { ONE_VS_CPU } from '~/presets/menu-keys';
import Logo from '~/assets/logo.svg';
import '~/styles/app.css';

const App = () => {
  const isCpu = useSelector(({ general }) => general.matchType === ONE_VS_CPU);
  const [, height] = useWindowSize();
  const { sidebar, analysisPanel, logo, fh, border, color } = useTheme();
  const minMaxWidth =
    height + sidebar.width + (isCpu ? analysisPanel.width : 0);

  return (
    <FlexRow height={fh} minWidth={minMaxWidth} maxWidth={minMaxWidth}>
      <Box
        width="220px"
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
            <Menu />
          </Box>

          <Scroll
            is={FlexOne}
            backgroundColor={color.white}
            margin={20}
            marginTop={0}
          >
            <Sheet />
          </Scroll>

          <NotiBar />
        </FlexCol>
      </Box>

      <Relative flexBasis={height}>
        <Diagram />
      </Relative>

      {isCpu && (
        <Box
          width={analysisPanel.width}
          borderLeft={border}
          borderRight={border}
          borderBottom={border}
          style={{ flexShrink: 0, height: '100%', overflow: 'hidden' }}
        >
          <AnalysisPanel />
        </Box>
      )}
    </FlexRow>
  );
};

export { App };
