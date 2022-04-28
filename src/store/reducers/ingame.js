import { Turn, Snapshot } from 'chess/es';
import {
  TOGGLE_TURN,
  UPDATE_SNAPSHOT,
  UPDATE_SELECTED_CODE,
} from '../actionTypes';

const initialState = {
  turn: Turn,
  selectedCode: '',
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

    case UPDATE_SELECTED_CODE: {
      return {
        ...state,
        selectedCode: payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
