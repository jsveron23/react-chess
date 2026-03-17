import { Turn, Opponent } from 'chess/es';
import {
  UPDATE_MATCH_TYPE,
  TOGGLE_THINKING,
  UPDATE_CPU_SIDE,
  UPDATE_PLAYER_SIDE,
} from '../action-types';

const initialState = {
  // 'w' = player controls White, CPU plays Black (default)
  // 'b' = player controls Black, CPU plays White
  playerSide: 'w',
  cpuTurn: Turn.b,
  thinking: false,
  depth: 3,
};

/**
 * AI reducer
 * @param {object} state - Current state
 * @param {object} action - Dispatched action
 * @return {object} Next state
 */
const aiReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_MATCH_TYPE: {
      return {
        ...state,
        thinking: false,
      };
    }

    case UPDATE_CPU_SIDE: {
      return {
        ...state,
        playerSide: payload,
        // CPU takes the opposite side of the player's choice
        cpuTurn: Turn[Opponent[payload]],
      };
    }

    case UPDATE_PLAYER_SIDE: {
      // Used by 1 vs 1 mode: only track which side the human starts as.
      // cpuTurn is intentionally left unchanged – irrelevant in 1v1.
      return {
        ...state,
        playerSide: payload,
      };
    }

    case TOGGLE_THINKING: {
      return {
        ...state,
        thinking: !state.thinking,
      };
    }

    default: {
      return state;
    }
  }
};

export { aiReducer };
