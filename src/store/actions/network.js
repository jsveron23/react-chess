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
  DECIDE_SIDE,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  TOGGLE_AWAITING,
  OPEN_NETWORK_GAME,
  CLOSE_NETWORK_GAME,
  JOIN_NETWORK_GAME,
  CONNECTED_PEER_NETWORK,
} from '../action-types';

/**
 * Open network game with own peer ID
 * @param {string} ownId - Own peer ID
 * @return {object} Action
 */
export function openNetworkGame(ownId) {
  return {
    type: OPEN_NETWORK_GAME,
    payload: ownId,
  };
}

/**
 * Close network game
 * @return {object} Action
 */
export function closeNetworkGame() {
  return {
    type: CLOSE_NETWORK_GAME,
  };
}

/**
 * Decide network side
 * @param {string} side - Side identifier
 * @return {object} Action
 */
export function decideSide(side) {
  return {
    type: DECIDE_SIDE,
    payload: side,
  };
}

/**
 * Toggle awaiting state
 * @return {object} Action
 */
export function toggleAwaiting() {
  return {
    type: TOGGLE_AWAITING,
  };
}

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

    dispatch({
      type: CONNECTED_PEER_NETWORK,
    });
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

      dispatch({
        type: JOIN_NETWORK_GAME,
      });
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

    dispatch({
      type: SEND_MESSAGE,
      payload: {
        side,
        message,
      },
    });
  };
}

/**
 * Receive message from peer
 * @param {object} messageData - Message data
 * @return {object} Action
 */
export function receiveMessage(messageData) {
  return {
    type: RECEIVE_MESSAGE,
    payload: messageData,
  };
}
