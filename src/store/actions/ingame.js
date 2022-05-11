import { batch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { compose, reject, equals, intersection, isEmpty, prop } from 'ramda';
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

    const isKing = Chess.detectPiece(Chess.King, code);
    const timeline = Chess.createTimeline(present, past);
    const predictCheck = Chess.predictPossibleCheck(timeline);

    // default movable tiles
    let mt = Chess.computeFinalMT(timeline, code);

    // TODO optimize it
    if (isKing) {
      const { pKey } = Chess.parseCode(code);

      // Check state
      if (from) {
        const isContacted = compose(
          prop('contact'),
          Chess.computeDistance(from)
        )(code);

        if (!isContacted) {
          const dodgeableTiles = Chess.getDodgeableTiles(timeline, from, code);

          mt = intersection(dodgeableTiles, mt);
        }
      }

      // remove possible danger tiles from movable tiles
      mt = mt.filter((tN) => !predictCheck(`${pKey}${tN}`));
    } else {
      if (from) {
        mt = intersection(mt, routes);
      } else {
        // if move piece, it would be Check state?
        const predictAttacker = predictCheck(code);

        if (predictAttacker) {
          const { tileName } = Chess.parseCode(predictAttacker);
          const kingCode = Chess.findYourKing(predictAttacker, timeline);
          const predictAttackerRoutes = compose(
            Chess.getAttackerRoutes(timeline, predictAttacker),
            Chess.pretendTo(kingCode)
          )(predictAttacker);
          const captureRoutes = intersection(mt, predictAttackerRoutes);

          mt = !isEmpty(captureRoutes) ? [tileName, ...captureRoutes] : [];
        }
      }
    }

    dispatch({
      type: types.UPDATE_MOVABLE_TILES,
      payload: mt,
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

    const {
      kingCode = '',
      attackerCode = '',
      attackerRoutes = [],
      // dodgeableTiles = [],
      // defendTiles = [],
      defenders = [],
    } = compose(
      Chess.computeCheck(selectedCode),
      Chess.createTimeline(present)
    )(past);

    // if (attackerCode) {
    //   console.group('Check', attackerCode);
    //   console.log('attackerRoutes: ', attackerRoutes);
    //   console.log('defenders: ', defenders);
    //   console.log('defendTiles: ', defendTiles);
    //   console.log('dodgeableTiles: ', dodgeableTiles);
    //   console.groupEnd();
    // }
    // const isStuck = isEmpty(defendTiles) && isEmpty(dodgeableTiles);
    // const isCheckmate = attackerCode && isStuck;
    // const isStalemate = !attackerCode && isStuck;

    // if (isCheckmate) {
    //   // TODO
    //   console.log('checkmate!');
    // }
    // else if (isStalemate) {
    //   // TODO
    //   console.log('stalemate!');
    // }

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
