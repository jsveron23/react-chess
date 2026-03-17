import { ONE_VS_CPU } from '~/presets';
import { updateMatchType } from './general';
import { TOGGLE_THINKING, UPDATE_CPU_SIDE, UPDATE_PLAYER_SIDE, UPDATE_DEPTH } from '../action-types';

/**
 * Toggle AI thinking state
 * @return {object} Action
 */
export function toggleThinking() {
  return {
    type: TOGGLE_THINKING,
  };
}

/**
 * Set the side the human player will control in 1 vs CPU mode.
 * Also resets the board so the new side takes effect immediately.
 * @param {string} side - 'w' (player plays White) or 'b' (player plays Black)
 * @return {Function} Thunk
 */
export function updateCpuSide(side) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CPU_SIDE,
      payload: side,
    });
    dispatch(updateMatchType(ONE_VS_CPU));
  };
}

/**
 * Update which side the human player starts as, without touching cpuTurn.
 * Used by 1 vs 1 mode so the side selector UI stays in sync across modes.
 * @param {string} side - 'w' or 'b'
 * @return {object} Action
 */
export function setPlayerSide(side) {
  return {
    type: UPDATE_PLAYER_SIDE,
    payload: side,
  };
}

/**
 * Set the player's side and sync cpuTurn without resetting the board.
 * Use this for the unified "Play as" selector so side preference is always
 * consistent regardless of which mode the user switches to next.
 * @param {string} side - 'w' or 'b'
 * @return {object} Action
 */
export function setSide(side) {
  return {
    type: UPDATE_CPU_SIDE,
    payload: side,
  };
}

/**
 * Update AI search depth (difficulty)
 * @param {number} depth
 * @return {object} Action
 */
export function updateDepth(depth) {
  return {
    type: UPDATE_DEPTH,
    payload: depth,
  };
}
