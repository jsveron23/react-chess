import { batch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { compose, reject, equals } from 'ramda';
import {
  Promotion,
  Special,
  Opponent,
  parseCode,
  replaceSnapshot,
  getTimeline,
  computeFinalMT,
  getPromotionCode,
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

// before moving
export function updateSelectedCode(pretendCode) {
  return (dispatch) => {
    batch(() => {
      dispatch(updateMovableTiles(pretendCode));
      dispatch({
        type: UPDATE_SELECTED_CODE,
        payload: pretendCode,
      });
    });
  };
}

export function capturePiece(pretendCode, nextTileName) {
  return (dispatch, getState) => {
    const {
      ingame: {
        present: { selectedCode, snapshot },
      },
    } = getState();

    batch(() => {
      dispatch(
        afterMoving(nextTileName, (nextCode) => {
          return compose(
            reject(equals(selectedCode)),
            replaceSnapshot(pretendCode, nextCode)
          )(snapshot);
        })
      );
    });
  };
}

export function movePiece(nextTileName) {
  return (dispatch, getState) => {
    const {
      ingame: {
        present: { selectedCode, snapshot },
      },
    } = getState();

    batch(() => {
      dispatch(
        afterMoving(nextTileName, (nextCode) =>
          replaceSnapshot(selectedCode, nextCode, snapshot)
        )
      );
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

// before moving
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

// before reset
export function afterMoving(nextTileName, getNextSnapshot) {
  return (dispatch, getState) => {
    const {
      ingame: {
        present: { turn, snapshot, selectedCode },
      },
    } = getState();

    const { side, piece, pKey } = parseCode(selectedCode);
    const nextCode = `${pKey}${nextTileName}`;
    const mvs = Special[piece];

    // default snapshot for safeness
    let nextSnapshot = snapshot;

    if (typeof getNextSnapshot === 'function') {
      // default snapshot before appying special movement
      nextSnapshot = getNextSnapshot(nextCode);
    }

    if (mvs) {
      mvs.forEach((mvName) => {
        switch (mvName) {
          // case Castling: {
          //   dispatch();
          //
          //   break;
          // }
          //
          // case EnPassant: {
          //   // cature after moving
          //   // store pending event
          //   dispatch();
          //
          //   break;
          // }

          case Promotion: {
            // TODO apply every kind of piece
            const queenCode = getPromotionCode(nextTileName, side);

            nextSnapshot = replaceSnapshot(nextCode, queenCode, nextSnapshot);

            break;
          }

          default:
        }
      });
    }

    dispatch(updateSnapshot(nextSnapshot));
    dispatch(removeSelectedCode());
    dispatch(removeMovableTiles());
    dispatch(updateTurn(Opponent[turn]));
  };
}
