import { batch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { Snapshot, Turn } from 'chess/es';
import { Storage, compress, decompress } from '~/utils';
import {
  updateTurn,
  updateSnapshot,
  removeCheck,
  removeSelectedCode,
  removeMovableTiles,
  removeSheetData,
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
      dispatch(removeCheck());
      dispatch(removeSheetData());
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

    dispatch(removeSelectedCode());
    dispatch(removeMovableTiles());

    Storage.setItem('save-game', data);

    dispatch({
      type: SAVE_TO_LOCALSTORAGE,
      payload: lastSaved,
    });
  };
}

export function exportGame() {
  return (dispatch, getState) => {
    const { general, ingame } = getState();
    const data = {
      ingame,
      general,
    };

    dispatch(removeSelectedCode());
    dispatch(removeMovableTiles());

    navigator.clipboard
      .writeText(compress(data))
      .then(
        () => alert('copied current playing data to clipboard!'),
        console.error
      );

    // console.log(compress(data), decompress(compress(data)));

    dispatch({
      type: 'EXPORT_GAME',
    });
  };
}
