import { compose, reject, equals } from 'ramda';
import {
  detectTurn,
  parseCode,
  computeMovableTiles,
  computeBlockedTiles,
} from 'chess/es';
import {
  // TOGGLE_TURN,
  UPDATE_SNAPSHOT,
  UPDATE_SELECTED_CODE,
  REMOVE_SELECTED_CODE,
  UPDATE_MOVABLE_TILES,
  REMOVE_MOVABLE_TILES,
} from '../actionTypes';

// export function toggleTurn(snapshot) {
//   return {
//     type: TOGGLE_TURN,
//     payload: snapshot,
//   };
// }

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
      ingame: { snapshot },
    } = getState();

    const movableTiles = compose(
      computeBlockedTiles(code, snapshot),
      // TODO add spacial movement
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

export function movePiece(tileName) {
  return (dispatch, getState) => {
    const {
      ingame: { snapshot, selectedCode },
    } = getState();

    // NOTE steps

    // 1. remove pervious code from snapshot
    const prevSnapshot = reject(equals(selectedCode), snapshot);
    dispatch(updateSnapshot(prevSnapshot));

    // 2. reset clickable tiles
    dispatch(removeSelectedCode());
    dispatch(removeMovableTiles());

    // 3. add moved piece(code) to snapshot
    const { pKey } = parseCode(selectedCode);
    dispatch(updateSnapshot([...prevSnapshot, `${pKey}${tileName}`]));

    // TODO change turn
  };
}
