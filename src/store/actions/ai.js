import { TOGGLE_THINKING } from '../action-types';

/**
 * Toggle AI thinking state
 * @return {object} Action
 */
export function toggleThinking() {
  return {
    type: TOGGLE_THINKING,
  };
}
