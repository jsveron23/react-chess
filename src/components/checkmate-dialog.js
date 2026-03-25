import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { Turn } from 'chess/es';
import { Box, Text, FlexMiddle, FlexCol, FlexRow, Button } from 'ui/es';
import { worker } from '~/services/worker/ai-worker';
import {
  updateMatchType,
  playCpu,
  setSide,
  updateTurn,
  saveGame,
} from '~/store/actions';
import { ONE_VS_ONE, ONE_VS_CPU } from '~/presets';
import { useTheme } from '~/hooks';
import { CpuSideSelector } from './cpu-side-selector';
import { DifficultySelector } from './difficulty-selector';

const CheckmateDialog = () => {
  const { color, border, borderRadius } = useTheme();
  const [recorded, setRecorded] = useState(false);

  const { isCheckmate, isStalemate } = useSelector(
    ({ ingame }) => ingame.present.checkData
  );
  const isReplaying = useSelector(({ replay }) => replay.isReplaying);
  const turn = useSelector(({ ingame }) => ingame.present.turn);
  const matchType = useSelector(({ general }) => general.matchType);
  const playerSide = useSelector(({ ai }) => ai.playerSide);
  const dispatch = useDispatch();

  if ((!isCheckmate && !isStalemate) || isReplaying) return null;

  const winner = turn === Turn.w ? 'Black' : 'White';

  const onGameModeChange = (value) => {
    worker.close();
    dispatch(updateMatchType(value));
  };

  const onStart = () => {
    worker.close();
    dispatch(updateMatchType(ONE_VS_CPU));
    dispatch(playCpu());
  };

  const onReset = () => dispatch(updateMatchType(ONE_VS_ONE));

  const onSelectSide = (side) => {
    worker.close();
    dispatch(setSide(side));
    if (matchType === ONE_VS_ONE) {
      dispatch(updateMatchType(ONE_VS_ONE));
      if (side === 'b') {
        dispatch(updateTurn(Turn.b));
        dispatch(ActionCreators.clearHistory());
      }
    } else if (matchType === ONE_VS_CPU) {
      dispatch(updateMatchType(ONE_VS_CPU));
    }
  };

  return createPortal(
    <FlexMiddle
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      backgroundColor="rgba(0,0,0,0.65)"
      zIndex={1000}
      alignItems="center"
      justifyContent="center"
    >
      <Box
        backgroundColor={color.white}
        borderRadius={borderRadius}
        maxWidth={360}
        width="92%"
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
          <Text display="block" fontWeight="bold" fontSize={16}>
            {isStalemate ? 'Stalemate!' : 'Checkmate!'}
          </Text>
          <Text display="block" fontSize={14} color={color.gray4}>
            {isStalemate ? 'Draw' : `${winner} wins`}
          </Text>
        </Box>

        {/* Mode controls */}
        <FlexCol gap={10} alignItems="center" padding="14px 16px">
          <FlexCol
            paddingLeft={10}
            paddingRight={10}
            gap={4}
            alignItems="center"
            fontSize="80%"
          >
            <Text>Mode:</Text>
            <FlexRow gap={6}>
              <Button
                width="auto"
                paddingLeft={10}
                paddingRight={10}
                disabled={matchType === ONE_VS_ONE}
                onClick={() => onGameModeChange(ONE_VS_ONE)}
              >
                1 vs 1
              </Button>
              <Button
                width="auto"
                paddingLeft={10}
                paddingRight={10}
                disabled={matchType === ONE_VS_CPU}
                onClick={() => onGameModeChange(ONE_VS_CPU)}
              >
                1 vs CPU
              </Button>
            </FlexRow>
          </FlexCol>
          {matchType === ONE_VS_CPU && (
            <>
              <CpuSideSelector
                playerSide={playerSide}
                onSelect={onSelectSide}
              />
              <DifficultySelector />
            </>
          )}
          {matchType === ONE_VS_CPU && <Button onClick={onStart}>Start</Button>}
          {matchType === ONE_VS_ONE && <Button onClick={onReset}>Reset</Button>}
          {recorded ? (
            <Text fontSize={13} color={color.gray4}>
              Saved!
            </Text>
          ) : (
            <Button
              width="auto"
              paddingLeft={10}
              paddingRight={10}
              onClick={() => {
                dispatch(saveGame());
                setRecorded(true);
              }}
            >
              Record
            </Button>
          )}
        </FlexCol>
      </Box>
    </FlexMiddle>,
    document.body
  );
};

export { CheckmateDialog };
