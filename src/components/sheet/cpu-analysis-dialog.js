import { createPortal } from 'react-dom';
import { Box, Text, FlexMiddle, FlexRow, FlexCol } from 'ui/es';
import { useTheme } from '~/hooks';
import { analyzeCpuMove, formatMoveLabel } from '~/utils/analyze-cpu-move';
import { CpuDecisionTree } from './cpu-decision-tree';

/**
 * Horizontal evaluation bar mirroring the style used by major chess sites.
 * Dark fill extends right for White advantage, gray fill extends left for Black.
 * Score is clamped to ±500 centipawns for display purposes.
 * @param {{ score: number }} props - score in centipawns (positive = White better)
 */
const EvalBar = ({ score }) => {
  const MAX = 500;
  const W = 260;
  const H = 16;
  const clamped = Math.max(-MAX, Math.min(MAX, score ?? 0));
  const half = W / 2;
  const barW = Math.abs((clamped / MAX) * half);
  const barX = clamped >= 0 ? half : half - barW;
  const barColor = clamped >= 0 ? '#222' : '#888';
  const pawns = Math.abs(clamped / 100).toFixed(1);
  const label =
    Math.abs(clamped) < 20
      ? 'Equal'
      : clamped > 0
        ? `White +${pawns}`
        : `Black +${pawns}`;

  return (
    <svg width={W} height={H + 14} style={{ display: 'block' }}>
      <rect x={0} y={0} width={W} height={H} fill="#e8e8e8" rx={3} />
      <rect x={barX} y={0} width={barW} height={H} fill={barColor} rx={2} />
      <line
        x1={half}
        y1={0}
        x2={half}
        y2={H}
        stroke="#bbb"
        strokeWidth={1}
      />
      <text
        x={half}
        y={H + 11}
        textAnchor="middle"
        fontSize={10}
        fill="#666"
        fontFamily="monospace"
      >
        {label}
      </text>
    </svg>
  );
};

/**
 * Labelled horizontal bar for a single evaluation component (material,
 * position, pawn structure, king safety). Bar extends right (dark) for White
 * advantage and left (gray) for Black advantage; clamped to ±max.
 * @param {{ label: string, score: number, max?: number }} props
 */
const BreakdownBar = ({ label, score, max = 200 }) => {
  const W = 160;
  const H = 10;
  const clamped = Math.max(-max, Math.min(max, score));
  const half = W / 2;
  const barW = Math.abs((clamped / max) * half);
  const barX = clamped >= 0 ? half : half - barW;
  const barColor = clamped >= 0 ? '#333' : '#888';
  const sign = score > 0 ? '+' : '';
  const val = `${sign}${(score / 100).toFixed(1)}`;

  return (
    <FlexRow alignItems="center" marginBottom={5}>
      <Box width={82} style={{ flexShrink: 0 }}>
        <Text fontSize={11} color="#666">
          {label}
        </Text>
      </Box>
      <svg width={W} height={H} style={{ flexShrink: 0 }}>
        <rect x={0} y={0} width={W} height={H} fill="#eeeeee" rx={2} />
        <rect x={barX} y={0} width={barW} height={H} fill={barColor} rx={1} />
        <line
          x1={half}
          y1={0}
          x2={half}
          y2={H}
          stroke="#ccc"
          strokeWidth={1}
        />
      </svg>
      <Box width={36} style={{ flexShrink: 0, textAlign: 'right' }}>
        <Text fontSize={10} color="#555" fontFamily="monospace">
          {val}
        </Text>
      </Box>
    </FlexRow>
  );
};

/**
 * Compact score bar used in the alternatives list.
 * Range is derived from bestScore so bars are comparable within the list.
 * @param {{ score: number, bestScore: number, isMax: boolean }} props
 */
const AlternativeScoreBar = ({ score, bestScore, isMax }) => {
  const W = 60;
  const H = 8;
  const range = Math.max(Math.abs(bestScore) + 100, 200);
  const clamped = Math.max(-range, Math.min(range, score));
  const half = W / 2;
  const barW = Math.abs((clamped / range) * half);
  const barX = clamped >= 0 ? half : half - barW;
  const barColor = clamped >= 0 ? '#333' : '#888';

  return (
    <svg width={W} height={H} style={{ display: 'block' }}>
      <rect x={0} y={0} width={W} height={H} fill="#eee" rx={2} />
      <rect x={barX} y={0} width={barW} height={H} fill={barColor} rx={1} />
      <line x1={half} y1={0} x2={half} y2={H} stroke="#ccc" strokeWidth={1} />
    </svg>
  );
};

/**
 * Uppercase section heading used to separate dialog regions.
 * @param {{ children: React.ReactNode, color: object }} props
 */
const SectionHeader = ({ children, color }) => (
  <Text
    display="block"
    fontSize={10}
    fontWeight="bold"
    color={color.gray4}
    marginBottom={6}
    style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}
  >
    {children}
  </Text>
);

/**
 * Full-width horizontal rule used between dialog sections.
 * @param {{ border: string }} props
 */
const Divider = ({ border }) => (
  <Box borderTop={border} marginTop={12} marginBottom={12} />
);

/**
 * Portal dialog that explains a CPU move in five sections:
 *   1. Position Score        — eval bar showing overall advantage
 *   2. Why This Move         — heuristic bullet points from analyzeCpuMove
 *   3. Search Tree           — horizontal tree of top candidate lines with continuations
 *   4. Evaluation Breakdown  — bar chart per eval component
 *   5. Alternatives Considered — ranked list of moves evaluated at full depth
 * Rendered into document.body via createPortal to avoid z-index conflicts.
 * @param {{ sideData: object, depth: number, onClose: Function }} props
 */
const CpuAnalysisDialog = ({ sideData, depth, onClose }) => {
  const { color, border, borderRadius } = useTheme();
  const analysis = analyzeCpuMove(sideData, depth);
  const { score, topMoves, breakdown, decisionTree } = sideData;
  const hasScore = score != null;
  const hasBreakdown = breakdown != null;
  const hasTopMoves = topMoves && topMoves.length > 0;
  const hasDecisionTree = decisionTree && decisionTree.length > 0;
  const isMaximizer = score != null && score >= 0;
  const bestScore = hasTopMoves ? topMoves[0].score : 0;

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
                CPU Move Analysis
              </Text>
              <Text display="block" fontSize={12} color={color.gray4}>
                {analysis.title}
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
            <Text key={i} display="block" fontSize={12} marginBottom={5} color={color.black}>
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
                Top lines: CPU candidate → Opp reply → CPU counter (★ = chosen).
                Scores in centipawns (+white / −black).
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
              <SectionHeader color={color}>Alternatives Considered</SectionHeader>
              <Text
                display="block"
                fontSize={10}
                color={color.gray4}
                marginBottom={8}
              >
                Moves the CPU evaluated at depth {depth}
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
                      <Text fontSize={10} color={isChosen ? color.black : color.gray4}>
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
                    <Box style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                      <AlternativeScoreBar
                        score={mv.score}
                        bestScore={bestScore}
                        isMax={isMaximizer}
                      />
                    </Box>
                    <Box width={42} style={{ flexShrink: 0, textAlign: 'right' }}>
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
                Score in pawns (+white / −black). ★ = chosen move.
              </Text>
            </>
          )}

          {/* ── Footer ── */}
          <Divider border={border} />
          <FlexRow justifyContent="space-between" alignItems="center">
            {sideData.thinkingTime != null ? (
              <Text fontSize={11} color={color.gray4}>
                Thinking time: {sideData.thinkingTime}s
              </Text>
            ) : (
              <Box />
            )}
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

export { CpuAnalysisDialog };
