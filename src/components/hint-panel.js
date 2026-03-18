import { Box, Text, FlexCol, FlexOne, FlexRow, Scroll } from 'ui/es';
import { diffSnapshot } from 'chess/es';
import { useTheme } from '~/hooks';
import { AnalysisContent } from './analysis-panel';

/**
 * Sidebar panel showing AI hint for the current position.
 * Has the same layout as AnalysisPanel but titled "Move Hint"
 * with a "Get Hint" button instead of pagination.
 * @param {{ hintData: object|null, loading: boolean, depth: number, thinking: boolean, onRequestHint: Function }} props
 * @return {React.ReactElement}
 */
const HintPanel = ({ hintData, loading, depth, thinking, onRequestHint }) => {
  const { color, border } = useTheme();
  const disabled = loading || thinking;

  let sideData = null;

  if (hintData) {
    const { bestState, score, topMoves, breakdown, decisionTree } = hintData;
    const timeline = bestState?.timeline || [];
    const { from = [], to = [] } =
      timeline.length >= 2 ? diffSnapshot(timeline[1], timeline[0]) : {};

    sideData = {
      from,
      to,
      checkData: { isCheck: false, isCheckmate: false, isStalemate: false },
      score,
      topMoves,
      breakdown,
      decisionTree,
      thinkingTime: null,
    };
  }

  return (
    <FlexCol height="100%">
      {/* Header */}
      <Box
        padding="14px 16px 10px"
        borderBottom={border}
        backgroundColor={color.gray1}
        style={{ flexShrink: 0 }}
      >
        <FlexRow justifyContent="space-between" alignItems="center">
          <Text display="block" fontWeight="bold" fontSize={14}>
            Move Hint
          </Text>
          <Box
            onClick={disabled ? undefined : onRequestHint}
            cursor={disabled ? 'default' : 'pointer'}
            padding="4px 12px"
            border={border}
            borderRadius={4}
            backgroundColor={disabled ? 'transparent' : color.white}
            style={{ opacity: disabled ? 0.4 : 1, flexShrink: 0 }}
          >
            <Text fontSize={12} color={color.black}>
              {loading ? 'Thinking…' : 'Get Hint'}
            </Text>
          </Box>
        </FlexRow>
      </Box>

      {/* Content */}
      <Scroll is={FlexOne}>
        {sideData ? (
          <AnalysisContent
            sideData={sideData}
            depth={depth}
            color={color}
            border={border}
          />
        ) : (
          <Box padding={20}>
            <Text
              display="block"
              fontSize={13}
              color={color.gray4}
              textAlign="center"
            >
              {loading
                ? 'Analysing position…'
                : 'Click "Get Hint" to see the best move'}
            </Text>
          </Box>
        )}
      </Scroll>
    </FlexCol>
  );
};

export { HintPanel };
