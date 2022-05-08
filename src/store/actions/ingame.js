import { batch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { compose, reject, equals, intersection, isEmpty } from 'ramda';
import * as Chess from 'chess/es';
import { ONE_VS_ONE } from '~/config';
import * as types from '../actionTypes';

export function updateTurn(turn) {
  return {
    type: types.UPDATE_TURN,
    payload: turn,
  };
}

export function removeSelectedCode() {
  return {
    type: types.REMOVE_SELECTED_CODE,
  };
}

export function removeMovableTiles() {
  return {
    type: types.REMOVE_MOVABLE_TILES,
  };
}

export function removeCheck() {
  return {
    type: types.REMOVE_CHECK,
  };
}

export function updateSnapshot(snapshot) {
  return {
    type: types.UPDATE_SNAPSHOT,
    payload: snapshot,
  };
}

/**
 * Update select code when click a tile
 * @param {String} code pretendCode
 */
export function updateSelectedCode(code) {
  return (dispatch) => {
    batch(() => {
      dispatch(updateMovableTiles(code));
      dispatch({
        type: types.UPDATE_SELECTED_CODE,
        payload: code,
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
            Chess.replaceCode(snapshot, pretendCode)
          )(nextCode);
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
        afterMoving(nextTileName, Chess.replaceCode(snapshot, selectedCode))
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
      ingame: {
        present: {
          check: { from, routes },
          turn,
        },
        present,
        past,
      },
    } = getState();

    const timeline = Chess.getTimeline(present, past);
    const predictAtkerCode = Chess.computePredictCheck(timeline, turn, code);
    let mt = [];

    if (!predictAtkerCode || from) {
      mt = Chess.computeFinalMT(code, timeline);

      if (from) {
        mt = intersection(mt, routes);
      }
    }

    dispatch({
      type: types.UPDATE_MOVABLE_TILES,
      payload: mt,
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

    const { side, piece, pKey } = Chess.parseCode(selectedCode);
    const nextCode = `${pKey}${nextTileName}`;
    const mvs = Chess.Special[piece] || [];
    let nextSnapshot = snapshot; // default snapshot for safeness

    if (typeof getNextSnapshot === 'function') {
      // default snapshot before appying special movement
      nextSnapshot = getNextSnapshot(nextCode);
    }

    mvs.forEach((mvName) => {
      switch (mvName) {
        // case Castling: {
        //   dispatch();
        //
        //   break;
        // }

        case Chess.EnPassant: {
          const tileName = Chess.getEnPassantTile.after(nextSnapshot, snapshot);

          if (tileName) {
            nextSnapshot = Chess.removeCodeByTile(nextSnapshot, tileName);
          }

          break;
        }

        case Chess.Promotion: {
          // TODO apply every kind of piece
          const queenCode = Chess.getPromotionCode(nextTileName, side);

          if (queenCode) {
            nextSnapshot = Chess.replaceCode(nextSnapshot, nextCode, queenCode);
          }

          break;
        }

        default:
      }
    });

    // NOTE
    // `updateCheck` should be called
    // after `updateSnapshot`
    // before `removeSelectedCode`
    dispatch(updateSnapshot(nextSnapshot));
    dispatch(updateCheck());
    dispatch(removeSelectedCode());
    dispatch(removeMovableTiles());
    dispatch(updateTurn(Chess.Opponent[turn]));
  };
}

export function updateCheck() {
  return (dispatch, getState) => {
    const {
      ingame: {
        present: { selectedCode },
        present,
        past,
      },
    } = getState();

    const timeline = Chess.getTimeline(present, past);
    const {
      kingCode = '',
      atkerCode = '',
      atkerRoutes = [],
      defenderTiles = [],
      defenders = [],
    } = Chess.computeCheck(selectedCode, timeline);

    if (atkerCode && isEmpty(defenderTiles)) {
      // TODO
      console.log('checkmate! or stalemate!');
    }

    // TODO king movement left
    // TODO when capture by king, also need to detect protector of capture piece
    console.log('attackerRoutes: ', atkerRoutes);

    dispatch({
      type: types.UPDATE_CHECK_CODE,
      payload: {
        to: atkerCode ? kingCode : '',
        from: atkerCode || '',
        routes: atkerRoutes,
        defenders,
      },
    });
  };
}
