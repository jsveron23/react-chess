import { compose } from 'ramda';
import { ActionCreators } from 'redux-undo';
import {
  Opponent,
  detectTurn,
  parseCode,
  replaceSnapshot,
  computeMovableTiles,
  computeBlockedTiles,
} from 'chess/es';
import { ONE_VS_ONE } from '~/config';
import { next } from '../batchActions';
import {
  UPDATE_TURN,
  // TOGGLE_TURN,
  UPDATE_SNAPSHOT,
  UPDATE_SELECTED_CODE,
  REMOVE_SELECTED_CODE,
  UPDATE_MOVABLE_TILES,
  REMOVE_MOVABLE_TILES,
} from '../actionTypes';

// export function toggleTurn() {
//   return (dispatch, getState) => {
//     const {
//       ingame: {
//         present: { turn },
//       },
//     } = getState();
//
//     dispatch({
//       type: TOGGLE_TURN,
//       payload: Opponent[turn],
//     });
//   };
// }

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
      ingame: {
        present: { snapshot },
      },
    } = getState();

    // TODO optimize it
    const computedMovableTiles = compose(
      // -> TODO able to capture
      computeBlockedTiles(code, snapshot),
      // -> TODO add spacial movement
      computeMovableTiles
    )(code);

    dispatch({
      type: UPDATE_MOVABLE_TILES,
      payload: computedMovableTiles,
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

    dispatch(next(nextSnapshot, Opponent[turn]));
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
