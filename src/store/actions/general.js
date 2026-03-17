import { ActionCreators } from 'redux-undo';
import { Snapshot, Turn } from 'chess/es';
import { debug } from '~/utils';
import { Compression } from '~/services/io';
import { Storage } from '~/services/storage';
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
  TOGGLE_FLIP,
} from '../action-types';

/**
 * Update match type and reset game state
 * @param {string} key - Match type key
 * @return {Function} Thunk
 */
export function updateMatchType(key) {
  return (dispatch) => {
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
  };
}

/**
 * Save game to localStorage
 * @return {Function} Thunk
 */
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

    Storage.setItem(SAVE_GAME, data);

    dispatch({
      type: SAVE_TO_LOCALSTORAGE,
      payload: lastSaved,
    });
  };
}

/**
 * Import game from clipboard paste
 * @return {object} Action
 */
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

/**
 * Export game state to clipboard
 * @return {Function} Thunk
 */
export function exportGame() {
  return (dispatch, getState) => {
    dispatch(removeSelectedCode());
    dispatch(removeMovableTiles());

    const { general, ingame } = getState();
    const data = {
      ingame,
      general,
    };

    // TODO ask save current game before

    navigator.clipboard.writeText(Compression.compress(data)).then(() => {
      alert('Copied current playing data to clipboard!');

      dispatch({
        type: EXPORT_GAME,
      });
    }, debug.err('clipboard issue'));
  };
}

/**
 * Toggle board flip
 * @return {object} Action
 */
export function toggleFlip() {
  return {
    type: TOGGLE_FLIP,
  };
}
