import Box from 'ui-box';
import { OverlayContainer, DiagramContainer } from '~/containers';
import useTheme from '~/styles/useTheme';

function DiagramSection() {
  const { diagram } = useTheme();

  return (
    <Box flexBasis={diagram.width} position="relative">
      <OverlayContainer />
      <DiagramContainer />
    </Box>
  );
}

export default DiagramSection;
