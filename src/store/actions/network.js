import { batch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { Snapshot, Turn, Side } from 'chess/es';
import { peerNetwork } from '~/services/network';
import worker from '~/services/worker/AIWorker';
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
} from '../actionTypes';

export function openNetworkGame(ownId) {
  return {
    type: OPEN_NETWORK_GAME,
    payload: ownId,
  };
}

export function closeNetworkGame() {
  return {
    type: CLOSE_NETWORK_GAME,
  };
}

export function decideSide(side) {
  return {
    type: DECIDE_SIDE,
    payload: side,
  };
}

export function toggleAwaiting() {
  return {
    type: TOGGLE_AWAITING,
  };
}

export function connectedPeerNetwork() {
  return (dispatch) => {
    batch(() => {
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
    });
  };
}

export function joinNetworkGame() {
  return (dispatch) => {
    const id = window.prompt('please input friend peer-id');

    // TODO check same id
    if (id) {
      batch(() => {
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
      });
    }
  };
}

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

export function receiveMessage(messageData) {
  return {
    type: RECEIVE_MESSAGE,
    payload: messageData,
  };
}
