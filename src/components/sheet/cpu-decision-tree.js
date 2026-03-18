import { formatMoveLabel } from '~/utils/analyze-cpu-move';

// ── Layout constants ──────────────────────────────────────────────────────────
const NW = 50; // node width
const NH = 28; // node height
const RH = 42; // row height (vertical distance between row tops)
const C1 = 0; // col 1 x — CPU candidate move
const C2 = 68; // col 2 x — opponent's reply (NW + 18px gap)
const C3 = 136; // col 3 x — CPU's counter (2 × (NW + 18px))
const C4 = 204; // col 4 x — opponent's reply to counter (3 × (NW + 18px))
const C5 = 272; // col 5 x — CPU's counter-counter (4 × (NW + 18px))
const SVG_W_2 = C2 + NW; // width when only 2 columns are shown
const SVG_W_3 = C3 + NW; // width when all 3 columns are shown
const SVG_W_4 = C4 + NW; // width when 4 columns are shown
const SVG_W_5 = C5 + NW; // width when all 5 columns are shown
const HEADER_H = 14; // height reserved for column header labels

/**
 * Format a centipawn score as a readable string (e.g. "+0.45", "-1.20").
 * Clamps to ±90 pawns; returns "#" for detected checkmate values.
 * @param {number} score - Score in centipawns (white's perspective)
 * @return {string}
 */
function fmtScore(score) {
  if (score >= 9000) return '+#';
  if (score <= -9000) return '-#';
  const s = Math.max(-9000, Math.min(9000, score));

  return `${s > 0 ? '+' : ''}${(s / 100).toFixed(2)}`;
}

/**
 * Rounded-rect node showing a move label and its evaluation score.
 * The isHighlight flag gives chosen-move nodes a distinct background.
 * @param {{ x: number, y: number, label: string, rankLabel: string|null, score: number, isHighlight: boolean }} props
 * @return {JSX.Element}
 */
const TreeNode = ({ x, y, label, rankLabel, score, isHighlight }) => {
  const fill = isHighlight ? '#dceeff' : '#eeeeee';
  const scoreStr = fmtScore(score);

  return (
    <g>
      <rect x={x} y={y} width={NW} height={NH} fill={fill} rx={3} />
      {rankLabel && (
        <text
          x={x + 4}
          y={y + 11}
          fontSize={8}
          fill="#888"
          fontFamily="monospace"
        >
          {rankLabel}
        </text>
      )}
      <text
        x={rankLabel ? x + 14 : x + 4}
        y={y + 11}
        fontSize={9}
        fill="#222"
        fontFamily="monospace"
        fontWeight={isHighlight ? 'bold' : 'normal'}
      >
        {label}
      </text>
      <text
        x={rankLabel ? x + 14 : x + 4}
        y={y + 22}
        fontSize={8}
        fill="#888"
        fontFamily="monospace"
      >
        {scoreStr}
      </text>
    </g>
  );
};

/**
 * Horizontal arrow from x1 to x2 at vertical position cy.
 * @param {{ x1: number, x2: number, cy: number }} props
 * @return {JSX.Element}
 */
const Arrow = ({ x1, x2, cy }) => (
  <g>
    <line x1={x1} y1={cy} x2={x2 - 4} y2={cy} stroke="#ccc" strokeWidth={1} />
    <polygon
      points={`${x2},${cy} ${x2 - 5},${cy - 3} ${x2 - 5},${cy + 3}`}
      fill="#ccc"
    />
  </g>
);

/**
 * Horizontal decision tree visualising how the CPU chose its move.
 *
 * Layout (left to right):
 *   Col 1 — CPU's candidate moves (top 4, best first, ★ = chosen)
 *   Col 2 — Opponent's best static-eval reply to each candidate
 *   Col 3 — CPU's planned counter to the opponent's reply (chosen line only)
 *   Col 4 — Opponent's reply to CPU's counter (chosen line only)
 *   Col 5 — CPU's counter-counter (chosen line only)
 *
 * Scores are shown in centipawns from White's perspective (+0.45 = White better).
 * @param {{ decisionTree: Array, color: object }} props
 * @return {JSX.Element|null}
 */
const CpuDecisionTree = ({ decisionTree, color }) => {
  if (!decisionTree || decisionTree.length === 0) return null;

  const rows = decisionTree.slice(0, 4);
  const hasCounter = rows.some((r) => r.reply?.counter != null);
  const hasReply2 = rows.some((r) => r.reply?.counter?.reply != null);
  const hasCounter2 = rows.some(
    (r) => r.reply?.counter?.reply?.counter != null
  );
  const svgW = hasCounter2
    ? SVG_W_5
    : hasReply2
    ? SVG_W_4
    : hasCounter
    ? SVG_W_3
    : SVG_W_2;
  const svgH = RH * rows.length + HEADER_H + 4;

  return (
    <svg width={svgW} height={svgH} style={{ display: 'block' }}>
      {/* Column headers */}
      <text
        x={C1 + NW / 2}
        y={10}
        textAnchor="middle"
        fontSize={8}
        fill={color.gray4}
        fontFamily="sans-serif"
      >
        CPU
      </text>
      <text
        x={C2 + NW / 2}
        y={10}
        textAnchor="middle"
        fontSize={8}
        fill={color.gray4}
        fontFamily="sans-serif"
      >
        Opp
      </text>
      {hasCounter && (
        <text
          x={C3 + NW / 2}
          y={10}
          textAnchor="middle"
          fontSize={8}
          fill={color.gray4}
          fontFamily="sans-serif"
        >
          CPU
        </text>
      )}
      {hasReply2 && (
        <text
          x={C4 + NW / 2}
          y={10}
          textAnchor="middle"
          fontSize={8}
          fill={color.gray4}
          fontFamily="sans-serif"
        >
          Opp
        </text>
      )}
      {hasCounter2 && (
        <text
          x={C5 + NW / 2}
          y={10}
          textAnchor="middle"
          fontSize={8}
          fill={color.gray4}
          fontFamily="sans-serif"
        >
          CPU
        </text>
      )}

      {/* Tree rows */}
      {rows.map((item, idx) => {
        const y = idx * RH + HEADER_H + 2;
        const cy = y + NH / 2;
        const isChosen = item.isChosen;
        const rankLabel = isChosen ? '★' : `${idx + 1}.`;
        const cpuLabel = formatMoveLabel(item);

        return (
          <g key={idx}>
            {/* CPU candidate node */}
            <TreeNode
              x={C1}
              y={y}
              label={cpuLabel}
              rankLabel={rankLabel}
              score={item.score}
              isHighlight={isChosen}
            />

            {/* Opponent reply */}
            {item.reply && (
              <>
                <Arrow x1={C1 + NW} x2={C2} cy={cy} />
                <TreeNode
                  x={C2}
                  y={y}
                  label={formatMoveLabel(item.reply)}
                  rankLabel={null}
                  score={item.reply.score}
                  isHighlight={false}
                />
              </>
            )}

            {/* CPU counter (chosen line only) */}
            {isChosen && item.reply?.counter && (
              <>
                <Arrow x1={C2 + NW} x2={C3} cy={cy} />
                <TreeNode
                  x={C3}
                  y={y}
                  label={formatMoveLabel(item.reply.counter)}
                  rankLabel={null}
                  score={item.reply.counter.score}
                  isHighlight={true}
                />
              </>
            )}

            {/* Opponent's reply to CPU counter (chosen line, depth 4) */}
            {isChosen && item.reply?.counter?.reply && (
              <>
                <Arrow x1={C3 + NW} x2={C4} cy={cy} />
                <TreeNode
                  x={C4}
                  y={y}
                  label={formatMoveLabel(item.reply.counter.reply)}
                  rankLabel={null}
                  score={item.reply.counter.reply.score}
                  isHighlight={false}
                />
              </>
            )}

            {/* CPU counter-counter (chosen line, depth 5) */}
            {isChosen && item.reply?.counter?.reply?.counter && (
              <>
                <Arrow x1={C4 + NW} x2={C5} cy={cy} />
                <TreeNode
                  x={C5}
                  y={y}
                  label={formatMoveLabel(item.reply.counter.reply.counter)}
                  rankLabel={null}
                  score={item.reply.counter.reply.counter.score}
                  isHighlight={true}
                />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export { CpuDecisionTree };
