import { batch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { Snapshot, Turn } from 'chess/es';
import { Storage } from '~/utils';
import {
  updateTurn,
  updateSnapshot,
  removeSelectedCode,
  removeMovableTiles,
} from './ingame';
import { UPDATE_MATCH_TYPE, SAVE_TO_LOCALSTORAGE } from '../actionTypes';

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
      dispatch(updateTurn(Turn.w));
      dispatch(ActionCreators.clearHistory());
    });
  };
}

export function saveGame() {
  return (dispatch, getState) => {
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
