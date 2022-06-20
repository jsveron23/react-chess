import { batch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { compose, reject, equals, clone, isEmpty, head } from 'ramda';
import * as Chess from 'chess/es';
import { ONE_VS_ONE, ONE_VS_CPU } from '~/presets';
import { peerNetwork } from '~/services/network';
import worker from '~/services/worker/AIWorker';
import { debug } from '~/utils';
import { toggleThinking } from './ai';
import { toggleAwaiting } from './network';
import { measureAxis } from './animate';
import * as types from '../actionTypes';

/**
 * Remove selected code (reset)
 * @return {Object}
 */
export function removeSelectedCode() {
  return {
    type: types.REMOVE_SELECTED_CODE,
  };
}

/**
 * Remove movable tiles (reset)
 * @return {Object}
 */
export function removeMovableTiles() {
  return {
    type: types.REMOVE_MOVABLE_TILES,
  };
}

/**
 * Remove check (reset)
 * @return {Object}
 */
export function removeCheck() {
  return {
    type: types.REMOVE_CHECK,
  };
}

/**
 * Update turn literally
 * @param  {String} turn
 * @return {Object}
 */
export function updateTurn(turn) {
  return {
    type: types.UPDATE_TURN,
    payload: turn,
  };
}

/**
 * Update snapshot
 * @param  {String} snapshot
 * @return {Object}
 */
export function updateSnapshot(snapshot) {
  return {
    type: types.UPDATE_SNAPSHOT,
    payload: snapshot,
  };
}

/**
 * Remove sheet data, notation data (reset)
 * @return {Object}
 */
export function removeSheetData() {
  return {
    type: types.REMOVE_SHEET_DATA,
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
          checkData: { attackerCode, attackerRoutes },
        },
        present,
        past,
      },
    } = getState();

    dispatch({
      type: types.UPDATE_MOVABLE_TILES,
      payload: compose(
        Chess.computePossibleMT(attackerCode, attackerRoutes, code),
        Chess.createTimeline(present)
      )(past),
    });
  };
}

export function capturePiece(pretendCode, nextTileName) {
  return (dispatch, getState) => {
    const {
      network: { connected, awaiting },
      ingame: {
        present: { selectedCode, snapshot },
      },
    } = getState();

    batch(() => {
      if (connected && !awaiting) {
        peerNetwork.send({
          command: 'capture',
          args: {
            pretendCode,
            nextTileName,
            selectedCode,
            snapshot,
          },
        });

        dispatch(toggleAwaiting());
      }

      const getNextSnapshot = compose(
        reject(equals(selectedCode)),
        Chess.replaceCode(snapshot, pretendCode)
      );

      dispatch(afterMoving(nextTileName, selectedCode, getNextSnapshot));
    });
  };
}

export function movePiece(nextTileName) {
  return (dispatch, getState) => {
    const {
      network: { connected, awaiting },
      ingame: {
        present: { selectedCode, snapshot },
      },
    } = getState();

    batch(() => {
      if (connected && !awaiting) {
        peerNetwork.send({
          command: 'move',
          args: {
            nextTileName,
            selectedCode,
            snapshot,
          },
        });

        dispatch(toggleAwaiting());
      }

      const getNextSnapshot = Chess.replaceCode(snapshot, selectedCode);

      dispatch(afterMoving(nextTileName, selectedCode, getNextSnapshot));
    });
  };
}

export function undo() {
  return (dispatch, getState) => {
    const {
      general: { matchType },
      ingame: { past },
    } = getState();

    // TODO
    // allow it from white/network

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
export function afterMoving(nextTileName, selectedCode, getNextSnapshot) {
  return (dispatch, getState) => {
    const {
      ingame: {
        present: { turn, snapshot },
      },
    } = getState();

    const CastlingMap = {
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
    const { side, piece, pKey } = Chess.parseCode(selectedCode);
    const nextCode = `${pKey}${nextTileName}`;
    const mvs = Chess.Special[piece] || [];
    let nextSnapshot = clone(snapshot); // default snapshot for safeness

    if (typeof getNextSnapshot === 'function') {
      // default snapshot before appying special movement
      nextSnapshot = getNextSnapshot(nextCode);
    } else {
      nextSnapshot = getNextSnapshot; // array
    }

    mvs.forEach((mvName) => {
      switch (mvName) {
        case Chess.Castling: {
          const { file } = Chess.computeDistance(selectedCode, nextCode);

          // filter it first, otherwise TypeError(`CastlingMap`)
          if (file === 2) {
            const codeMap = CastlingMap[nextCode];
            const currRookCode = codeMap.curr;

            if (currRookCode) {
              const nextRookCode = codeMap.next;

              nextSnapshot = Chess.replaceCode(
                nextSnapshot,
                currRookCode,
                nextRookCode
              );
            }
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
          const queenCode = Chess.getPromotionCode(
            Chess.Queen,
            nextTileName,
            side
          );

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
    dispatch(updateCheckState(selectedCode));
    dispatch(removeSelectedCode());
    dispatch(removeMovableTiles());
    dispatch(updateTurn(Chess.Opponent[turn]));
    dispatch(updateSheetData());
    dispatch(playCpu());
  };
}

export function playCpu() {
  return (dispatch, getState) => {
    const {
      ai: { cpuTurn, depth },
      general: { matchType },
      ingame: {
        present: { turn },
        present,
        past,
      },
    } = getState();

    if (matchType !== ONE_VS_CPU || turn !== cpuTurn) {
      return;
    }

    dispatch(toggleThinking());

    worker.task(
      {
        depth,
        present,
        past,
      },
      ({ bestState = {} }) => {
        const { node = [], timeline: nextTimeline } = bestState;
        const [selectedCode, nextCode] = node;

        if (!isEmpty(node)) {
          const tileName = Chess.parseCode.prop('tileName', nextCode);

          dispatch(afterMoving(tileName, selectedCode, head(nextTimeline)));
          dispatch(toggleThinking());
        } else {
          debug.err('something went wrong!', bestState);
        }
      },
      () => dispatch(toggleThinking())
    );
  };
}

export function updateCheckState(selectedCode) {
  return (dispatch, getState) => {
    const {
      ingame: { present, past },
    } = getState();

    const timeline = Chess.createTimeline(present, past);
    const { data, isCheck, isStalemate, isCheckmate } = Chess.computeCheckState(
      selectedCode,
      timeline
    );

    dispatch({
      type: types.UPDATE_CHECK_CODE,
      payload: {
        isCheck,
        isStalemate,
        isCheckmate,
        ...data,
      },
    });
  };
}

export function updateSheetData() {
  return (dispatch, getState) => {
    const {
      ingame: { present, past },
    } = getState();

    const sheetData = Chess.createSheetData(present, past);

    dispatch(measureAxis(sheetData));
    dispatch({
      type: types.UPDATE_SHEET_DATA,
      payload: sheetData,
    });
  };
}
