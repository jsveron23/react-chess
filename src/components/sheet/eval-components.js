import { Box, Text, FlexRow } from 'ui/es';

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
      <line x1={half} y1={0} x2={half} y2={H} stroke="#bbb" strokeWidth={1} />
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
        <line x1={half} y1={0} x2={half} y2={H} stroke="#ccc" strokeWidth={1} />
      </svg>
      <Box width={36} style={{ flexShrink: 0, textAlign: 'right' }}>
        <Text fontSize={10} color="#555" fontFamily="monospace">
          {val}
        </Text>
      </Box>
    </FlexRow>
  );
};

const AlternativeScoreBar = ({ score, bestScore }) => {
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

const WinProbabilityBar = ({ whitePct }) => {
  const W = 260;
  const H = 10;
  const whiteW = Math.round((whitePct / 100) * W);
  const blackW = W - whiteW;

  return (
    <Box>
      <svg width={W} height={H} style={{ display: 'block' }}>
        <rect x={0} y={0} width={W} height={H} fill="#888" rx={3} />
        <rect x={blackW} y={0} width={whiteW} height={H} fill="#222" rx={3} />
      </svg>
      <FlexRow justifyContent="space-between" marginTop={3}>
        <Text fontSize={9} color="#888">
          Black {100 - whitePct}%
        </Text>
        <Text fontSize={9} color="#444">
          White {whitePct}%
        </Text>
      </FlexRow>
    </Box>
  );
};

const QualityBadge = ({ label, badgeColor }) => (
  <Box
    style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: 10,
      border: `1px solid ${badgeColor}`,
      backgroundColor: `${badgeColor}22`,
    }}
  >
    <Text fontSize={10} fontWeight="bold" color={badgeColor}>
      {label}
    </Text>
  </Box>
);

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

const Divider = ({ border }) => (
  <Box borderTop={border} marginTop={12} marginBottom={12} />
);

export {
  EvalBar,
  BreakdownBar,
  AlternativeScoreBar,
  WinProbabilityBar,
  QualityBadge,
  SectionHeader,
  Divider,
};
