import { batch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { Snapshot, Turn } from 'chess/es';
import { Storage, Compression } from '~/utils';
import { SAVE_GAME, INSTANT_IMPORT_DATA } from '~/presets';
import {
  updateTurn,
  updateSnapshot,
  removeCheck,
  removeSelectedCode,
  removeMovableTiles,
  removeSheetData,
} from './ingame';
import {
  UPDATE_MATCH_TYPE,
  SAVE_TO_LOCALSTORAGE,
  IMPORT_GAME,
  EXPORT_GAME,
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

    Storage.setItem(SAVE_GAME, data);

    dispatch({
      type: SAVE_TO_LOCALSTORAGE,
      payload: lastSaved,
    });
  };
}

export function importGame() {
  const data = window.prompt('Paste export data here!');

  if (data) {
    Storage.setItem(INSTANT_IMPORT_DATA, data);

    window.location.reload();
  }

  return {
    type: IMPORT_GAME,
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

    // TODO ask save current game before

    navigator.clipboard.writeText(Compression.compress(data)).then(() => {
      alert('Copied current playing data to clipboard!');

      dispatch({
        type: EXPORT_GAME,
      });
    }, console.error);
  };
}
