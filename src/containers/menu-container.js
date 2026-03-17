import { connect } from 'react-redux';
import { ActionTypes } from 'redux-undo';
import { Menu } from '~/components';
import { worker } from '~/services/worker/ai-worker';
import {
  undo,
  saveGame,
  importGame,
  exportGame,
  toggleFlip,
  joinNetworkGame,
  updateMatchType,
} from '~/store/actions';
import { toLocaleDate } from '~/utils';
import {
  ONE_VS_ONE,
  SAVE,
  ONLINE,
  IMPORT,
  EXPORT,
  FLIP,
  ONE_VS_CPU,
} from '~/presets';
import { PeerIdContainer } from './peer-id-container';
import { ChatContainer } from './chat-container';

const mapStateToProps = ({
  ai: { thinking },
  general: { lastSaved },
  network: { connected },
  ingame: { past },
}) => ({ past, connected, lastSaved, thinking });

const mapDispatchToProps = (dispatch) => ({ dispatch });

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const noUndoYet = stateProps.past.length === 0;
  const isConnected = stateProps.connected;
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
        disabled: noUndoYet || isConnected,
        onClick: () => dispatch(undo()),
      },
    ],
    mainMenu: [
      {
        key: ONE_VS_ONE,
        title: '1 vs 1',
        disabled: isConnected,
        onClick: () => {
          worker.close();
          dispatch(updateMatchType(ONE_VS_ONE));
        },
      },
      {
        key: ONE_VS_CPU,
        title: '1 vs CPU (Alpha)',
        disabled: isConnected,
        onClick: () => {
          worker.close();
          dispatch(updateMatchType(ONE_VS_CPU));
        },
      },
      {
        key: FLIP,
        title: 'Flip diagram (Up & Down)',
        disabled: isConnected,
        onClick: () => dispatch(toggleFlip()),
      },
      {
        key: SAVE,
        title: `Save ${lastSaved}`,
        disabled: thinking || noUndoYet || isConnected,
        onClick: () => dispatch(saveGame()),
      },
      {
        key: IMPORT,
        title: 'Import',
        disabled: thinking || isConnected,
        onClick: () => dispatch(importGame()),
      },
      {
        key: EXPORT,
        title: 'Export',
        disabled: thinking || noUndoYet || isConnected,
        onClick: () => dispatch(exportGame()),
      },
      {
        key: ONLINE,
        title: 'Network (WebRTC)',
        disabled: isConnected,
        onClick: () => {
          dispatch(updateMatchType(ONLINE));
          dispatch(joinNetworkGame());
        },
        children: () => {
          if (isConnected) {
            return <ChatContainer />;
          }

          return <PeerIdContainer />;
        },
      },
    ],
  };
};

const MenuContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Menu);

export { MenuContainer };
