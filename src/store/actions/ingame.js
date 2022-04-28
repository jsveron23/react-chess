import {
  TOGGLE_TURN,
  UPDATE_SNAPSHOT,
  UPDATE_SELECTED_CODE,
} from '../actionTypes';

export function toggleTurn(snapshot) {
  return {
    type: TOGGLE_TURN,
    payload: snapshot,
  };
}

export function updateSnapshot(snapshot) {
  return {
    type: UPDATE_SNAPSHOT,
    payload: snapshot,
  };
}

export function updateSelectedCode(code) {
  return {
    type: UPDATE_SELECTED_CODE,
    payload: code,
  };
}
