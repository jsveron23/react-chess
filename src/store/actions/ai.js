import { ONE_VS_CPU } from '~/presets';
import { updateMatchType } from './general';
import {
  toggleThinking,
  setCpuSide,
  updatePlayerSide,
  updateDepth,
} from '../slices/ai';

export { toggleThinking, updatePlayerSide, updateDepth };

// alias kept for compatibility
export const setPlayerSide = updatePlayerSide;

/**
 * Set the side the human player will control in 1 vs CPU mode.
 * Also resets the board so the new side takes effect immediately.
 * @param {string} side - 'w' (player plays White) or 'b' (player plays Black)
 * @return {Function} Thunk
 */
export function updateCpuSide(side) {
  return (dispatch) => {
    dispatch(setCpuSide(side));
    dispatch(updateMatchType(ONE_VS_CPU));
  };
}

/**
 * Set the player's side and sync cpuTurn without resetting the board.
 * Use this for the unified "Play as" selector so side preference is always
 * consistent regardless of which mode the user switches to next.
 * @param {string} side - 'w' or 'b'
 * @return {object} Action
 */
export const setSide = setCpuSide;
