import { Storage } from '~/utils';
import { UPDATE_MATCH_TYPE, SAVE_TO_LOCALSTORAGE } from '../actionTypes';
import { restart } from '../batchActions';

export function updateMatchType(key) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_MATCH_TYPE,
      payload: key,
    });
    dispatch(restart());
  };
}

export function saveGame() {
  return (dispatch, getState) => {
    const currState = getState();

    Storage.setItem('save-game', currState);

    dispatch({
      type: SAVE_TO_LOCALSTORAGE,
    });
  };
}
