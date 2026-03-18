import { ActionCreators } from 'redux-undo';
import { Snapshot, Turn, Side } from 'chess/es';
import { peerNetwork } from '~/services/network';
import { worker } from '~/services/worker/ai-worker';
import {
  updateTurn,
  updateSnapshot,
  removeCheck,
  removeSelectedCode,
  removeMovableTiles,
  removeSheetData,
} from './ingame';
import {
  openNetworkGame,
  closeNetworkGame,
  setConnected,
  decideSide,
  toggleAwaiting,
  addMessage,
  receiveMessage,
} from '../slices/network';

export {
  openNetworkGame,
  closeNetworkGame,
  decideSide,
  toggleAwaiting,
  receiveMessage,
};

/**
 * Handle connected peer network and reset game state
 * @return {Function} Thunk
 */
export function connectedPeerNetwork() {
  return (dispatch) => {
    dispatch(updateSnapshot(Snapshot));
    dispatch(removeSelectedCode());
    dispatch(removeMovableTiles());
    dispatch(removeCheck());
    dispatch(removeSheetData());
    dispatch(updateTurn(Turn.w));
    dispatch(ActionCreators.clearHistory());

    dispatch(setConnected());
  };
}

/**
 * Join network game by peer ID prompt
 * @return {Function} Thunk
 */
export function joinNetworkGame() {
  return (dispatch) => {
    const id = window.prompt('please input friend peer-id');

    // TODO check same id
    if (id) {
      worker.close();

      dispatch(updateSnapshot(Snapshot));
      dispatch(removeSelectedCode());
      dispatch(removeMovableTiles());
      dispatch(removeCheck());
      dispatch(removeSheetData());
      dispatch(updateTurn(Turn.w));
      dispatch(ActionCreators.clearHistory());
      dispatch(decideSide(Side.white));

      peerNetwork.join(id);

      dispatch(setConnected());
    }
  };
}

/**
 * Send chat message to peer
 * @param {string} message - Message text
 * @return {Function} Thunk
 */
export function sendMessage(message) {
  return (dispatch, getState) => {
    const {
      network: { side, connected },
    } = getState();

    if (connected) {
      peerNetwork.send({
        command: 'message',
        args: {
          side,
          message,
        },
      });
    }

    dispatch(addMessage({ side, message }));
  };
}
