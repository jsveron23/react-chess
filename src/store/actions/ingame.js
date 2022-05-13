import { batch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { compose, reject, equals, isEmpty, clone } from 'ramda';
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

export function updateSelectedCode(code) {
  return (dispatch) => {
    batch(() => {
      // NOTE do not change sequence
      dispatch(updateMovableTiles(code));
      dispatch({
        type: types.UPDATE_SELECTED_CODE,
        payload: code,
      });
    });
  };
}

// before moving, selected
export function updateMovableTiles(code) {
  return (dispatch, getState) => {
    const {
      ingame: {
        present: {
          check: { from, routes },
        },
        present,
        past,
      },
    } = getState();

    dispatch({
      type: types.UPDATE_MOVABLE_TILES,
      payload: compose(
        Chess.computePossibleMT(from, routes, code),
        Chess.createTimeline(present)
      )(past),
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
        afterMoving(
          nextTileName,
          compose(
            reject(equals(selectedCode)),
            Chess.replaceCode(snapshot, pretendCode)
          )
        )
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

    if (matchType !== ONE_VS_ONE) {
      const lastTurn = past.length - 2;
      const pastTurn = lastTurn < 0 ? 0 : lastTurn;

      dispatch(ActionCreators.jumpToPast(pastTurn));
    } else {
      dispatch(ActionCreators.undo());
    }
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
    let nextSnapshot = clone(snapshot); // default snapshot for safeness

    if (typeof getNextSnapshot === 'function') {
      // default snapshot before appying special movement
      nextSnapshot = getNextSnapshot(nextCode);
    }

    mvs.forEach((mvName) => {
      switch (mvName) {
        case Chess.Castling: {
          const { file } = Chess.computeDistance(selectedCode, nextCode);
          const castlingMap = {
            wKc1: {
              curr: 'wRa1',
              next: 'wRd1',
            },
            wKg1: {
              curr: 'wRh1',
              next: 'wRf1',
            },
            bKc8: {
              curr: 'bRa8',
              next: 'bRd8',
            },
            bKg8: {
              curr: 'bRh8',
              next: 'bRf8',
            },
          };
          const currRookCode = castlingMap[nextCode].curr;

          if (file === 2 && currRookCode) {
            nextSnapshot = Chess.replaceCode(
              nextSnapshot,
              currRookCode,
              castlingMap[nextCode].next
            );
          }

          break;
        }

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
    // `updateCheckState` should be called
    // after `updateSnapshot`
    // before `removeSelectedCode`
    dispatch(updateSnapshot(nextSnapshot));
    dispatch(updateCheckState());
    dispatch(removeSelectedCode());
    dispatch(removeMovableTiles());
    dispatch(updateTurn(Chess.Opponent[turn]));
  };
}

export function updateCheckState() {
  return (dispatch, getState) => {
    const {
      ingame: {
        present: { selectedCode },
        present,
        past,
      },
    } = getState();

    const timeline = Chess.createTimeline(present, past);
    const {
      kingCode = '',
      attackerCode = '',
      attackerRoutes = [],
      dodgeableTiles = [],
      defendTiles = [],
      defenders = [],
    } = Chess.computeCheckState(selectedCode, timeline);

    // console.group('Attacker: ', attackerCode || 'none');
    // console.log('attackerRoutes: ', attackerRoutes);
    // console.log('defenders: ', defenders);
    // console.log('defendTiles: ', defendTiles);
    // console.log('dodgeableTiles: ', dodgeableTiles);
    // console.groupEnd();

    const isStuck = isEmpty(defenders) && isEmpty(defendTiles);
    const isNotDodgeable = isEmpty(dodgeableTiles);
    const isCheckmate = attackerCode && isStuck && isNotDodgeable;
    const isStalemate = !attackerCode && isStuck && isNotDodgeable;

    if (isCheckmate) {
      console.log('checkmate!');
    } else if (isStalemate) {
      console.log('stalemate!');
    }

    dispatch({
      type: types.UPDATE_CHECK_CODE,
      payload: {
        to: attackerCode ? kingCode : '',
        from: attackerCode || '',
        routes: attackerRoutes,
        defenders,
      },
    });
  };
}
