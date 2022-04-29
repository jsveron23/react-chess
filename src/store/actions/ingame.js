import { compose } from 'ramda';
import { detectTurn, computeMovableTiles, computeBlockedTiles } from 'chess/es';
import {
  TOGGLE_TURN,
  UPDATE_SNAPSHOT,
  UPDATE_SELECTED_CODE,
  COMPUTE_MOVABLE_TILES,
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

export function updateMovableTiles(code) {
  return (dispatch, getState) => {
    const {
      ingame: { snapshot },
    } = getState();

    const movableTiles = compose(
      computeBlockedTiles(code, snapshot),
      // TODO add spacial movement
      computeMovableTiles
    )(code);

    dispatch({
      type: COMPUTE_MOVABLE_TILES,
      payload: movableTiles,
    });
  };
}

export function updateSelectedCode(code) {
  return (dispatch, getState) => {
    const {
      ingame: { turn },
    } = getState();

    if (detectTurn(turn, code)) {
      dispatch(updateMovableTiles(code));
      dispatch({
        type: UPDATE_SELECTED_CODE,
        payload: code,
      });
    }
  };
}
