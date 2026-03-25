import { createPortal } from 'react-dom';
import { Box, Text, FlexMiddle, FlexRow, Loading } from 'ui/es';
import { diffSnapshot } from 'chess/es';
import { useTheme } from '~/hooks';
import { AnalysisContent } from './analysis-panel';

const HintDialog = ({ isOpen, onClose, hintData, loading, depth }) => {
  const { color, border, borderRadius } = useTheme();

  if (!isOpen) {
    return null;
  }

  let sideData = null;

  if (hintData) {
    const { bestState, score, topMoves, breakdown } = hintData;
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
      thinkingTime: null,
    };
  }

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
            <Text display="block" fontWeight="bold" fontSize={14}>
              Move Hint
            </Text>
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

        {/* Content */}
        {loading ? (
          <FlexMiddle padding={40} justifyContent="center">
            <Loading text="Thinking…" size={24} loading />
          </FlexMiddle>
        ) : sideData ? (
          <AnalysisContent
            sideData={sideData}
            depth={depth}
            color={color}
            border={border}
          />
        ) : null}
      </Box>
    </FlexMiddle>,
    document.body
  );
};

export { HintDialog };
