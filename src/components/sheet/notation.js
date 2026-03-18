import { parseNotation } from 'chess/es';
import { FlexOne, Flex, Text } from 'ui/es';
import { useTheme } from '~/hooks';

/**
 * Single move cell in the notation sheet.
 * Displays the algebraic notation and, for CPU moves, the thinking time.
 * When onAnalyze is provided and the move is a CPU move (has thinkingTime),
 * the cell becomes clickable and calls onAnalyze with the sideData payload.
 * @param {{ sideData: object|null, onAnalyze: Function|null }} props
 */
const Notation = ({ sideData = null, onAnalyze = null, ...props }) => {
  const { color } = useTheme();
  const isCpuMove = sideData?.thinkingTime != null;
  const isClickable = isCpuMove && onAnalyze != null;

  return (
    <FlexOne
      is={Flex}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      backgroundColor={color.white}
      color={color.black}
      padding={5}
      cursor={isClickable ? 'pointer' : 'default'}
      onClick={isClickable ? () => onAnalyze(sideData) : undefined}
      {...props}
    >
      {sideData && <Text>{parseNotation(sideData)}</Text>}
      {isCpuMove && (
        <Text fontSize={10} color={color.gray2} marginLeft={4}>
          {sideData.thinkingTime}s
        </Text>
      )}
    </FlexOne>
  );
};

export { Notation };
