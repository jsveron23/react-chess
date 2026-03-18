import { createPortal } from 'react-dom';
import { Box, Text, FlexMiddle, FlexRow } from 'ui/es';
import { diffSnapshot } from 'chess/es';
import { useTheme } from '~/hooks';
import { analyzeCpuMove, formatMoveLabel } from '~/utils/analyze-cpu-move';
import { CpuDecisionTree } from './sheet/cpu-decision-tree';
import {
  EvalBar,
  BreakdownBar,
  AlternativeScoreBar,
  SectionHeader,
  Divider,
} from './sheet/eval-components';

/**
 * Portal dialog showing AI-recommended hint move for the current player.
 * Reuses the same structure as CpuAnalysisDialog but titled "Move Hint".
 * @param {{ hintData: object, depth: number, onClose: Function }} props
 * @return {React.ReactPortal|null}
 */
const HintDialog = ({ hintData, depth, onClose }) => {
  const { color, border, borderRadius } = useTheme();

  if (!hintData) return null;

  const { bestState, score, topMoves, breakdown, decisionTree } = hintData;

  // Reconstruct from/to from bestState timeline for analyzeCpuMove
  const timeline = bestState?.timeline || [];
  const { from = [], to = [] } =
    timeline.length >= 2 ? diffSnapshot(timeline[1], timeline[0]) : {};

  const sideData = {
    from,
    to,
    checkData: { isCheck: false, isCheckmate: false, isStalemate: false },
    score,
    topMoves,
    breakdown,
    decisionTree,
    thinkingTime: null,
  };

  const analysis = analyzeCpuMove(sideData, depth);
  const hasScore = score != null;
  const hasBreakdown = breakdown != null;
  const hasTopMoves = topMoves && topMoves.length > 0;
  const hasDecisionTree = decisionTree && decisionTree.length > 0;
  const bestScore = hasTopMoves ? topMoves[0].score : 0;
  const bestMoveLabel = hasTopMoves ? formatMoveLabel(topMoves[0]) : null;

  return createPortal(
    <FlexMiddle
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      backgroundColor="rgba(0,0,0,0.65)"
      zIndex={1000}
      onClick={onClose}
      alignItems="center"
      justifyContent="center"
    >
      <Box
        backgroundColor={color.white}
        borderRadius={borderRadius}
        maxWidth={360}
        width="92%"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header */}
        <Box
          padding="14px 16px 10px"
          borderBottom={border}
          position="sticky"
          top="0"
          backgroundColor={color.white}
          zIndex={1}
        >
          <FlexRow justifyContent="space-between" alignItems="center">
            <Box>
              <Text display="block" fontWeight="bold" fontSize={14}>
                Move Hint
              </Text>
              <Text display="block" fontSize={12} color={color.gray4}>
                {bestMoveLabel ? `Try: ${bestMoveLabel}` : analysis.title}
              </Text>
            </Box>
            <Box
              onClick={onClose}
              cursor="pointer"
              padding="4px 8px"
              backgroundColor={color.gray1}
              borderRadius={4}
              style={{ flexShrink: 0 }}
            >
              <Text fontSize={13} color={color.gray4}>
                ✕
              </Text>
            </Box>
          </FlexRow>
        </Box>

        <Box padding="12px 16px">
          {/* ── Position Score ── */}
          {hasScore && (
            <>
              <SectionHeader color={color}>Position Score</SectionHeader>
              <FlexRow justifyContent="center" marginBottom={4}>
                <EvalBar score={score} />
              </FlexRow>
              <Text
                display="block"
                fontSize={10}
                color={color.gray4}
                textAlign="center"
                marginBottom={2}
              >
                {score > 50
                  ? '▲ White is better'
                  : score < -50
                  ? '▼ Black is better'
                  : '≈ Position is roughly equal'}
              </Text>
              <Divider border={border} />
            </>
          )}

          {/* ── Why This Move ── */}
          <SectionHeader color={color}>Why This Move</SectionHeader>
          {analysis.points.map((point, i) => (
            <Text
              key={i}
              display="block"
              fontSize={12}
              marginBottom={5}
              color={color.black}
            >
              • {point}
            </Text>
          ))}

          {/* ── Search Tree ── */}
          {hasDecisionTree && (
            <>
              <Divider border={border} />
              <SectionHeader color={color}>Search Tree</SectionHeader>
              <Text
                display="block"
                fontSize={10}
                color={color.gray4}
                marginBottom={8}
              >
                Top lines: candidate → Opp reply → counter (★ = best). Scores in
                centipawns (+white / −black).
              </Text>
              <FlexRow justifyContent="center" marginBottom={4}>
                <CpuDecisionTree decisionTree={decisionTree} color={color} />
              </FlexRow>
            </>
          )}

          {/* ── Evaluation Breakdown ── */}
          {hasBreakdown && (
            <>
              <Divider border={border} />
              <SectionHeader color={color}>Evaluation Breakdown</SectionHeader>
              <Text
                display="block"
                fontSize={10}
                color={color.gray4}
                marginBottom={8}
              >
                Each bar shows White (dark) vs Black (gray) advantage
              </Text>
              <BreakdownBar
                label="Material"
                score={breakdown.material}
                max={2000}
              />
              <BreakdownBar
                label="Position"
                score={breakdown.position}
                max={150}
              />
              <BreakdownBar
                label="Pawn Struct."
                score={breakdown.pawnStructure}
                max={80}
              />
              <BreakdownBar
                label="King Safety"
                score={breakdown.kingSafety}
                max={150}
              />
              <FlexRow
                justifyContent="flex-end"
                marginTop={4}
                paddingTop={4}
                borderTop={border}
              >
                <Text fontSize={10} color={color.gray4} marginRight={4}>
                  Total:
                </Text>
                <Text
                  fontSize={11}
                  fontWeight="bold"
                  color={breakdown.total >= 0 ? color.black : color.gray4}
                  fontFamily="monospace"
                >
                  {breakdown.total > 0 ? '+' : ''}
                  {(breakdown.total / 100).toFixed(2)}
                </Text>
              </FlexRow>
            </>
          )}

          {/* ── Top Alternatives ── */}
          {hasTopMoves && (
            <>
              <Divider border={border} />
              <SectionHeader color={color}>
                Alternatives Considered
              </SectionHeader>
              <Text
                display="block"
                fontSize={10}
                color={color.gray4}
                marginBottom={8}
              >
                Moves evaluated at depth {depth}
              </Text>
              {topMoves.map((mv, i) => {
                const label = formatMoveLabel(mv);
                const isChosen = i === 0;
                const sign = mv.score > 0 ? '+' : '';
                const scoreLabel = `${sign}${(mv.score / 100).toFixed(2)}`;

                return (
                  <FlexRow
                    key={i}
                    alignItems="center"
                    marginBottom={6}
                    padding="4px 6px"
                    backgroundColor={isChosen ? color.gray1 : 'transparent'}
                    borderRadius={3}
                  >
                    <Box width={16} style={{ flexShrink: 0 }}>
                      <Text
                        fontSize={10}
                        color={isChosen ? color.black : color.gray4}
                      >
                        {isChosen ? '★' : `${i + 1}.`}
                      </Text>
                    </Box>
                    <Box width={60} style={{ flexShrink: 0 }}>
                      <Text
                        fontSize={12}
                        fontWeight={isChosen ? 'bold' : 'normal'}
                        fontFamily="monospace"
                        color={color.black}
                      >
                        {label}
                      </Text>
                    </Box>
                    <Box
                      style={{ flex: 1, display: 'flex', alignItems: 'center' }}
                    >
                      <AlternativeScoreBar
                        score={mv.score}
                        bestScore={bestScore}
                      />
                    </Box>
                    <Box
                      width={42}
                      style={{ flexShrink: 0, textAlign: 'right' }}
                    >
                      <Text
                        fontSize={10}
                        fontFamily="monospace"
                        color={color.gray4}
                      >
                        {scoreLabel}
                      </Text>
                    </Box>
                  </FlexRow>
                );
              })}
              <Text
                display="block"
                fontSize={10}
                color={color.gray4}
                marginTop={4}
              >
                Score in pawns (+white / −black). ★ = recommended move.
              </Text>
            </>
          )}

          {/* ── Footer ── */}
          <Divider border={border} />
          <FlexRow justifyContent="flex-end" alignItems="center">
            <Box
              onClick={onClose}
              cursor="pointer"
              padding="6px 16px"
              backgroundColor={color.black}
              borderRadius={4}
            >
              <Text fontSize={12} color={color.white}>
                Close
              </Text>
            </Box>
          </FlexRow>
        </Box>
      </Box>
    </FlexMiddle>,
    document.body
  );
};

export { HintDialog };
