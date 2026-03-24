import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes, ActionCreators } from 'redux-undo';
import { Turn } from 'chess/es';
import { Hr, FlexCol, FlexRow, Text, Button } from 'ui/es';
import { worker } from '~/services/worker/ai-worker';
import {
  undo,
  importGame,
  exportGame,
  exportGameAsPgn,
  exportGameAsFen,
  toggleFlip,
  updateMatchType,
  playCpu,
  requestHint,
  setSide,
  updateTurn,
} from '~/store/actions';
import { clearHint } from '~/store/slices/hint';
import {
  ONE_VS_ONE,
  ONE_VS_CPU,
  IMPORT,
  EXPORT,
  EXPORT_PGN,
  EXPORT_FEN,
  FLIP,
} from '~/presets';
import { MenuItems } from './menu/menu-items';
import { HintDialog } from './hint-dialog';
import { CheckmateDialog } from './checkmate-dialog';
import { CpuSideSelector } from './cpu-side-selector';
import { DifficultySelector } from './difficulty-selector';

const Menu = () => {
  const [hintOpen, setHintOpen] = useState(false);

  const thinking = useSelector(({ ai }) => ai.thinking);
  const playerSide = useSelector(({ ai }) => ai.playerSide);
  const depth = useSelector(({ ai }) => ai.depth);
  const matchType = useSelector(({ general }) => general.matchType);
  const hintData = useSelector(({ hint }) => hint.data);
  const hintLoading = useSelector(({ hint }) => hint.loading);
  const past = useSelector(({ ingame }) => ingame.past);
  const turn = useSelector(({ ingame }) => ingame.present.turn);
  const dispatch = useDispatch();

  const noUndoYet = past.length === 0;
  const hintEnabled =
    matchType === ONE_VS_CPU &&
    !thinking &&
    Turn[playerSide] === turn &&
    past.length >= (playerSide === 'w' ? 2 : 1);

  const onHint = () => {
    dispatch(clearHint());
    dispatch(requestHint());
  };

  const ingameMenu = [
    {
      key: FLIP,
      title: 'Flip diagram',
      disabled: false,
      onClick: () => dispatch(toggleFlip()),
    },
    {
      key: ActionTypes.UNDO,
      title: 'Undo',
      disabled: noUndoYet,
      onClick: () => dispatch(undo()),
    },
  ];

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

  const mainMenu = [
    {
      key: IMPORT,
      title: 'Import a snapshot',
      disabled: thinking,
      onClick: () => dispatch(importGame()),
    },
    {
      key: EXPORT,
      title: 'Export a snapshot',
      disabled: thinking || noUndoYet,
      onClick: () => dispatch(exportGame()),
    },
    [
      {
        key: EXPORT_PGN,
        title: 'Export as PGN',
        disabled: thinking || noUndoYet,
        onClick: () => dispatch(exportGameAsPgn()),
      },
      {
        key: EXPORT_FEN,
        title: 'Export as FEN',
        disabled: thinking || noUndoYet,
        onClick: () => dispatch(exportGameAsFen()),
      },
    ],
  ];

  return (
    <>
      <MenuItems data={ingameMenu} />
      <Hr is="p" marginTop={10} marginBottom={10} />
      <FlexCol gap={10} alignItems="center">
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
            <CpuSideSelector playerSide={playerSide} onSelect={onSelectSide} />
            <DifficultySelector />
          </>
        )}
        {matchType === ONE_VS_CPU && <Button onClick={onStart}>Start</Button>}
        {matchType === ONE_VS_CPU && (
          <Button
            disabled={!hintEnabled}
            onClick={() => {
              onHint();
              setHintOpen(true);
            }}
          >
            Hint
          </Button>
        )}
        {matchType === ONE_VS_ONE && <Button onClick={onReset}>Reset</Button>}
      </FlexCol>
      <Hr is="p" marginTop={10} marginBottom={10} />
      <MenuItems data={mainMenu} />
      <CheckmateDialog />
      <HintDialog
        isOpen={hintOpen}
        onClose={() => setHintOpen(false)}
        hintData={hintData}
        loading={hintLoading}
        depth={depth}
      />
    </>
  );
};

export { Menu };
