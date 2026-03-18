import { connect } from 'react-redux';
import { ActionTypes } from 'redux-undo';
import { Menu } from '~/components';
import { worker } from '~/services/worker/ai-worker';
import {
  undo,
  saveGame,
  importGame,
  exportGame,
  exportGameAsPgn,
  exportGameAsFen,
  toggleFlip,
  updateMatchType,
  playCpu,
} from '~/store/actions';
import { toLocaleDate } from '~/utils';
import {
  ONE_VS_ONE,
  SAVE,
  IMPORT,
  EXPORT,
  EXPORT_PGN,
  EXPORT_FEN,
  FLIP,
  ONE_VS_CPU,
} from '~/presets';
import { SideSelectorContainer } from './side-selector-container';
import { DifficultySelectorContainer } from './difficulty-selector-container';

const mapStateToProps = ({
  ai: { thinking, playerSide },
  general: { lastSaved, matchType },
  ingame: { past },
}) => ({ past, lastSaved, thinking, matchType, playerSide });

const mapDispatchToProps = (dispatch) => ({ dispatch });

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const noUndoYet = stateProps.past.length === 0;
  const { thinking } = stateProps;
  const lastSaved = stateProps.lastSaved
    ? `/ ${toLocaleDate(stateProps.lastSaved)}`
    : '';
  const { dispatch } = dispatchProps;

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,

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
      [
        {
          key: SAVE,
          title: `Save ${lastSaved}`,
          disabled: thinking || noUndoYet,
          onClick: () => dispatch(saveGame()),
        },
        {
          key: IMPORT,
          title: 'Import',
          disabled: thinking,
          onClick: () => dispatch(importGame()),
        },
      ],
      {
        key: EXPORT,
        title: 'Export as Snapshot',
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
