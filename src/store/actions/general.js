import { batch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { Snapshot, Turn } from 'chess/es';
import { Storage, PeerNetwork } from '~/utils';
import {
  updateTurn,
  updateSnapshot,
  removeCheck,
  removeSelectedCode,
  removeMovableTiles,
} from './ingame';
import {
  UPDATE_MATCH_TYPE,
  SAVE_TO_LOCALSTORAGE,
  OPEN_NETWORK_GAME,
  JOIN_NETWORK_GAME,
  CONNECTED_PEER_NETWORK,
} from '../actionTypes';

export function updateMatchType(key) {
  return (dispatch) => {
    batch(() => {
      dispatch({
        type: UPDATE_MATCH_TYPE,
        payload: key,
      });
      dispatch(updateSnapshot(Snapshot));
      dispatch(removeSelectedCode());
      dispatch(removeMovableTiles());
      dispatch(removeCheck());
      dispatch(updateTurn(Turn.w));
      dispatch(ActionCreators.clearHistory());
    });
  };
}

export function saveGame() {
  return (dispatch, getState) => {
    dispatch(removeSelectedCode());
    dispatch(removeMovableTiles());

    const currState = getState();
    const lastSaved = +new Date();
    const data = {
      ...currState,
      general: {
        lastSaved,
        ...currState.general,
      },
    };

    Storage.setItem('save-game', data);

    dispatch({
      type: SAVE_TO_LOCALSTORAGE,
      payload: lastSaved,
    });
  };
}

let peerNetwork = null;

export function connectedPeerNetwork() {
  return (dispatch) => {
    dispatch(updateSnapshot(Snapshot));
    dispatch(removeSelectedCode());
    dispatch(removeMovableTiles());
    dispatch(removeCheck());
    dispatch(updateTurn(Turn.w));
    dispatch(ActionCreators.clearHistory());

    dispatch({
      type: CONNECTED_PEER_NETWORK,
    });
  };
}

export function openNetworkGame() {
  return (dispatch) => {
    if (!peerNetwork) {
      peerNetwork = new PeerNetwork(
        () => dispatch(connectedPeerNetwork()),
        (id) => {
          dispatch({
            type: OPEN_NETWORK_GAME,
            payload: id,
          });
        },
        () => {
          // TODO:
          // dispatch and move data
        }
      );
    }
  };
}

export function joinNetworkGame(id) {
  return (dispatch) => {
    dispatch(updateSnapshot(Snapshot));
    dispatch(removeSelectedCode());
    dispatch(removeMovableTiles());
    dispatch(removeCheck());
    dispatch(updateTurn(Turn.w));
    dispatch(ActionCreators.clearHistory());

    peerNetwork.join(id);

    dispatch({
      type: JOIN_NETWORK_GAME,
    });
  };
}
