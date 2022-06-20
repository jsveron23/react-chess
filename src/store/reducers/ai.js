import { Turn } from 'chess/es';
import { UPDATE_MATCH_TYPE, TOGGLE_THINKING } from '../actionTypes';

const initialState = {
  cpuTurn: Turn.b,
  thinking: false,
  depth: 2,
};

function reducer(state = initialState, action) {
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
}

export default reducer;
