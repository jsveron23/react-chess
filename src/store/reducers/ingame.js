import { Turn, Snapshot } from 'chess/es';
import { TOGGLE_TURN, UPDATE_SNAPSHOT } from '../actionTypes';

const initialState = {
  turn: Turn,
  snapshot: Snapshot,
};

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_TURN: {
      return {
        ...state,
        turn: payload,
      };
    }

    case UPDATE_SNAPSHOT: {
      return {
        ...state,
        snapshot: payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
