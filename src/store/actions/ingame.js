import { compose } from 'ramda';
import {
  Opponent,
  detectTurn,
  parseCode,
  replaceSnapshot,
  computeMovableTiles,
  computeBlockedTiles,
} from 'chess/es';
import {
  TOGGLE_TURN,
  UPDATE_SNAPSHOT,
  UPDATE_SELECTED_CODE,
  REMOVE_SELECTED_CODE,
  UPDATE_MOVABLE_TILES,
  REMOVE_MOVABLE_TILES,
} from '../actionTypes';

export function toggleTurn() {
  return (dispatch, getState) => {
    const {
      ingame: {
        present: { turn },
      },
    } = getState();

    dispatch({
      type: TOGGLE_TURN,
      payload: Opponent[turn],
    });
  };
}

export function removeSelectedCode() {
  return {
    type: REMOVE_SELECTED_CODE,
  };
}

export function removeMovableTiles() {
  return {
    type: REMOVE_MOVABLE_TILES,
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
      ingame: {
        present: { snapshot },
      },
    } = getState();

    const movableTiles = compose(
      // -> TODO able to capture
      computeBlockedTiles(code, snapshot),
      // -> TODO add spacial movement
      computeMovableTiles
    )(code);

    dispatch({
      type: UPDATE_MOVABLE_TILES,
      payload: movableTiles,
    });
  };
}

export function updateSelectedCode(code) {
  return (dispatch, getState) => {
    const {
      ingame: {
        present: { turn },
      },
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

export function movePiece(tileName) {
  return (dispatch, getState) => {
    const {
      ingame: {
        present: { snapshot, selectedCode },
      },
    } = getState();

    const { pKey } = parseCode(selectedCode);
    const nextCode = `${pKey}${tileName}`;
    const nextSnapshot = replaceSnapshot(selectedCode, nextCode, snapshot);

    dispatch(updateSnapshot(nextSnapshot));
    dispatch(removeSelectedCode());
    dispatch(removeMovableTiles());
    dispatch(toggleTurn());
  };
}
