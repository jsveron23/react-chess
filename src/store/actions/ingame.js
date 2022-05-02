import { batch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import {
  Opponent,
  detectTurn,
  parseCode,
  replaceSnapshot,
  getTimeline,
  computeFinalMT,
} from 'chess/es';
import { ONE_VS_ONE } from '~/config';
import {
  UPDATE_TURN,
  UPDATE_SNAPSHOT,
  UPDATE_SELECTED_CODE,
  REMOVE_SELECTED_CODE,
  UPDATE_MOVABLE_TILES,
  REMOVE_MOVABLE_TILES,
} from '../actionTypes';

export function updateTurn(turn) {
  return {
    type: UPDATE_TURN,
    payload: turn,
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
      ingame: { present, past },
    } = getState();

    dispatch({
      type: UPDATE_MOVABLE_TILES,
      payload: computeFinalMT(code, getTimeline(present, past)),
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
        present: { snapshot, selectedCode, turn },
      },
    } = getState();

    const { pKey } = parseCode(selectedCode);
    const nextCode = `${pKey}${tileName}`;
    const nextSnapshot = replaceSnapshot(selectedCode, nextCode, snapshot);

    batch(() => {
      dispatch(updateSnapshot(nextSnapshot));
      dispatch(removeSelectedCode());
      dispatch(removeMovableTiles());
      dispatch(updateTurn(Opponent[turn]));
    });
  };
}

export function undo() {
  return (dispatch, getState) => {
    const {
      general: { matchType },
      ingame: { past },
    } = getState();

    if (matchType === ONE_VS_ONE) {
      const lastTurn = past.length - 2;
      const pastTurn = lastTurn < 0 ? 0 : lastTurn;

      dispatch(ActionCreators.jumpToPast(pastTurn));
    } else {
      dispatch(ActionCreators.undo());
    }
  };
}
