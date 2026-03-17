import { Turn } from 'chess/es';
import { UPDATE_MATCH_TYPE, TOGGLE_THINKING } from '../action-types';

const initialState = {
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
  const { type } = action;

  switch (type) {
    case UPDATE_MATCH_TYPE: {
      return {
        ...state,
        thinking: false,
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
