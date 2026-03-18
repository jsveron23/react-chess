import { ActionCreators } from 'redux-undo';
import { compose, reject, equals, clone, isEmpty, head } from 'ramda';
import * as Chess from 'chess/es';
import { ONE_VS_ONE, ONE_VS_CPU } from '~/presets';
import { peerNetwork } from '~/services/network';
import { worker } from '~/services/worker/ai-worker';
import { debug } from '~/utils';
import { toggleThinking } from './ai';
import { toggleAwaiting } from './network';
import { measureAxis } from './animate';
import * as types from '../action-types';

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

/**
 * Update selected code and compute movable tiles
 * @param {string} code - Piece code
 * @return {Function} Thunk
 */
export function updateSelectedCode(code) {
  return (dispatch) => {
    // NOTE do not change sequence
    dispatch(updateMovableTiles(code));
    dispatch({
      type: types.UPDATE_SELECTED_CODE,
      payload: code,
    });
  };
}

/**
 * Update movable tiles for a given code
 * @param {string} code - Piece code
 * @return {Function} Thunk
 */
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

/**
 * Capture a piece on the board
 * @param {string} pretendCode - Attacker code
 * @param {string} nextTileName - Target tile
 * @return {Function} Thunk
 */
export function capturePiece(pretendCode, nextTileName) {
  return (dispatch, getState) => {
    const {
      network: { connected, awaiting },
      ingame: {
        present: { selectedCode, snapshot },
      },
    } = getState();

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
  };
}

/**
 * Move a piece to the next tile
 * @param {string} nextTileName - Target tile name
 * @return {Function} Thunk
 */
export function movePiece(nextTileName) {
  return (dispatch, getState) => {
    const {
      network: { connected, awaiting },
      ingame: {
        present: { selectedCode, snapshot },
      },
    } = getState();

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
  };
}

/**
 * Undo last move
 * @return {Function} Thunk
 */
export function undo() {
  return (dispatch, getState) => {
    const {
      general: { matchType },
      ingame: { past, present },
    } = getState();

    // TODO
    // allow it from white/network

    if (matchType !== ONE_VS_ONE) {
      // Save full sheetData (with analysis) before jumping.
      // redux-undo only snapshots on UPDATE_TURN, which fires before
      // updateSheetData, so past states never have analysis attached.
      const savedSheetData = present.sheetData;

      const lastTurn = past.length - 2;
      const pastTurn = lastTurn < 0 ? 0 : lastTurn;

      dispatch(ActionCreators.jumpToPast(pastTurn));
      dispatch(restoreSheetAnalysis(savedSheetData));
      dispatch(playCpu());
    } else {
      dispatch(ActionCreators.undo());
    }
  };
}

/**
 * Merge analysis data (thinkingTime, score, topMoves, breakdown) from a
 * previously-saved sheetData snapshot into the current present.sheetData.
 * Used after jumpToPast to re-attach analysis that was lost when redux-undo
 * restored a history state that predates the updateSheetData dispatch.
 * @param {Array} savedSheetData
 * @return {Function} Thunk
 */
export function restoreSheetAnalysis(savedSheetData) {
  return (dispatch, getState) => {
    const {
      ingame: {
        present: { sheetData: currentSheetData },
      },
    } = getState();

    const merged = currentSheetData.map((row, idx) => {
      const saved = savedSheetData[idx];
      if (!saved) return row;

      const next = { ...row };
      ['white', 'black'].forEach((side) => {
        if (next[side] && saved[side]?.thinkingTime != null) {
          next[side] = {
            ...next[side],
            thinkingTime: saved[side].thinkingTime,
            ...(saved[side].score != null && { score: saved[side].score }),
            ...(saved[side].topMoves != null && {
              topMoves: saved[side].topMoves,
            }),
            ...(saved[side].breakdown != null && {
              breakdown: saved[side].breakdown,
            }),
            ...(saved[side].decisionTree != null && {
              decisionTree: saved[side].decisionTree,
            }),
          };
        }
      });

      return next;
    });

    dispatch({
      type: types.UPDATE_SHEET_DATA,
      payload: merged,
    });
  };
}

/**
 * Handle after-move actions
 * @param {string} nextTileName - Target tile name
 * @param {string} selectedCode - Moving piece code
 * @param {Function|Array} getNextSnapshot - Snapshot getter or array
 * @param {number|null} thinkingTime - AI thinking time in seconds
 * @param {Object|null} analysisData - AI analysis payload { score, topMoves, breakdown }
 * @return {Function} Thunk
 */
// before reset
export function afterMoving(
  nextTileName,
  selectedCode,
  getNextSnapshot,
  thinkingTime = null,
  analysisData = null
) {
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
    dispatch(updateSheetData(thinkingTime, analysisData));
    dispatch(playCpu());
  };
}

/**
 * Play CPU move if applicable
 * @return {Function} Thunk
 */
export function playCpu() {
  return (dispatch, getState) => {
    const {
      ai: { cpuTurn, depth },
      general: { matchType },
      ingame: {
        present: { turn, checkData: { isCheckmate, isStalemate } },
        present,
        past,
      },
    } = getState();

    if (matchType !== ONE_VS_CPU || turn !== cpuTurn) {
      return;
    }

    if (isCheckmate || isStalemate) {
      return;
    }

    dispatch(toggleThinking());

    const startTime = Date.now();

    worker.task(
      {
        depth,
        present,
        past,
      },
      ({ bestState = {}, score = null, topMoves = [], breakdown = null, decisionTree = null }) => {
        const { node = [], timeline: nextTimeline } = bestState;
        const [selectedCode, nextCode] = node;

        if (!isEmpty(node)) {
          const tileName = Chess.parseCode.prop('tileName', nextCode);
          const thinkingTime = Math.round((Date.now() - startTime) / 1000);
          const analysisData = { score, topMoves, breakdown, decisionTree };

          dispatch(
            afterMoving(
              tileName,
              selectedCode,
              head(nextTimeline),
              thinkingTime,
              analysisData
            )
          );
          dispatch(toggleThinking());
        } else {
          debug.err('something went wrong!', bestState);
        }
      },
      () => dispatch(toggleThinking())
    );
  };
}

/**
 * Update check state after move
 * @param {string} selectedCode - Moving piece code
 * @return {Function} Thunk
 */
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

/**
 * Update sheet/notation data
 * @param {number|null} thinkingTime - AI thinking time in seconds
 * @param {Object|null} analysisData - AI analysis payload { score, topMoves, breakdown }
 * @return {Function} Thunk
 */
export function updateSheetData(thinkingTime = null, analysisData = null) {
  return (dispatch, getState) => {
    const {
      ingame: {
        present,
        past,
        present: { sheetData: prevSheetData },
      },
    } = getState();

    let sheetData = Chess.createSheetData(present, past);

    // Preserve thinkingTime from previous sheetData entries
    sheetData = sheetData.map((row, idx) => {
      const prev = prevSheetData[idx];
      if (!prev) return row;
      const merged = { ...row };
      ['white', 'black'].forEach((side) => {
        if (merged[side] && prev[side]?.thinkingTime != null) {
          merged[side] = {
            ...merged[side],
            thinkingTime: prev[side].thinkingTime,
            ...(prev[side].score != null && { score: prev[side].score }),
            ...(prev[side].topMoves != null && { topMoves: prev[side].topMoves }),
            ...(prev[side].breakdown != null && { breakdown: prev[side].breakdown }),
            ...(prev[side].decisionTree != null && { decisionTree: prev[side].decisionTree }),
          };
        }
      });

      return merged;
    });

    // Attach new thinkingTime and analysisData to the last entry
    if (thinkingTime !== null && sheetData.length > 0) {
      const lastIdx = sheetData.length - 1;
      const lastRow = sheetData[lastIdx];
      const lastSide = lastRow.black ? 'black' : 'white';
      const extra = { thinkingTime };

      if (analysisData !== null) {
        extra.score = analysisData.score;
        extra.topMoves = analysisData.topMoves;
        extra.breakdown = analysisData.breakdown;
        extra.decisionTree = analysisData.decisionTree;
      }

      sheetData = [
        ...sheetData.slice(0, lastIdx),
        {
          ...lastRow,
          [lastSide]: { ...lastRow[lastSide], ...extra },
        },
      ];
    }

    dispatch(measureAxis(sheetData));
    dispatch({
      type: types.UPDATE_SHEET_DATA,
      payload: sheetData,
    });
  };
}
