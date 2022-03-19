import { TOGGLE_TURN, UPDATE_SNAPSHOT } from '../actionTypes';

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
