import { Relative } from 'ui/es';
import { OverlayContainer, DiagramContainer } from '~/containers';
import useTheme from '~/styles/useTheme';

function DiagramSection() {
  const { diagram } = useTheme();

  return (
    <Relative flexBasis={diagram.width}>
      <OverlayContainer />
      <DiagramContainer />
    </Relative>
  );
}

export default DiagramSection;
