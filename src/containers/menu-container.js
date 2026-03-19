import { connect } from 'react-redux';
import { ActionTypes } from 'redux-undo';
import { Menu } from '~/components';
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
} from '~/store/actions';
import { clearHint } from '~/store/slices/hint';
import {
  ONE_VS_ONE,
  IMPORT,
  EXPORT,
  EXPORT_PGN,
  EXPORT_FEN,
  FLIP,
  ONE_VS_CPU,
} from '~/presets';
import { Turn } from 'chess/es';
import { SideSelectorContainer } from './side-selector-container';
import { DifficultySelectorContainer } from './difficulty-selector-container';

const mapStateToProps = ({
  ai: { thinking, playerSide, depth },
  general: { matchType },
  hint: { data: hintData, loading: hintLoading },
  ingame: {
    past,
    present: { turn },
  },
}) => ({
  past,
  thinking,
  matchType,
  playerSide,
  depth,
  hintData,
  hintLoading,
  turn,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const noUndoYet = stateProps.past.length === 0;
  const { thinking, matchType, playerSide, past, turn } = stateProps;
  const { dispatch } = dispatchProps;

  const hintEnabled =
    matchType === ONE_VS_CPU &&
    !thinking &&
    Turn[playerSide] === turn &&
    past.length >= (playerSide === 'w' ? 2 : 1);

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    hintEnabled,
    onHint: () => {
      dispatch(clearHint());
      dispatch(requestHint());
    },

    ingameMenu: [
      {
        key: ActionTypes.UNDO,
        title: 'Undo',
        disabled: noUndoYet,
        onClick: () => dispatch(undo()),
      },
    ],
    onGameModeChange: (value) => {
      worker.close();
      dispatch(updateMatchType(value));
    },
    onStart: () => {
      worker.close();
      dispatch(updateMatchType(ONE_VS_CPU));
      dispatch(playCpu());
    },
    onReset: () => dispatch(updateMatchType(ONE_VS_ONE)),
    cpuChildren: () => (
      <>
        <SideSelectorContainer />
        <DifficultySelectorContainer />
      </>
    ),
    mainMenu: [
      {
        key: FLIP,
        title: 'Flip diagram (Up & Down)',
        disabled: false,
        onClick: () => dispatch(toggleFlip()),
      },
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
    ],
  };
};

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Menu);

export { MenuContainer };
