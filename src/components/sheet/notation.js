import { parseNotation } from 'chess/es';
import { FlexOne, Text } from 'ui/es';
import { useTheme } from '~/hooks';

const Notation = ({ sideData = null, ...props }) => {
  const { color } = useTheme();

  return (
    <FlexOne
      is={Text}
      textAlign="center"
      backgroundColor={color.white}
      color={color.black}
      padding={5}
      {...props}
    >
      {sideData && parseNotation(sideData)}
    </FlexOne>
  );
};


export { Notation };
