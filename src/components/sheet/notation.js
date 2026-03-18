import { parseNotation } from 'chess/es';
import { FlexOne, Flex, Text } from 'ui/es';
import { useTheme } from '~/hooks';

const Notation = ({ sideData = null, ...props }) => {
  const { color } = useTheme();

  return (
    <FlexOne
      is={Flex}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      backgroundColor={color.white}
      color={color.black}
      padding={5}
      {...props}
    >
      {sideData && <Text>{parseNotation(sideData)}</Text>}
      {sideData?.thinkingTime != null && (
        <Text fontSize={10} color={color.gray2} marginLeft={4}>
          {sideData.thinkingTime}s
        </Text>
      )}
    </FlexOne>
  );
};

export { Notation };
