import { Turn, Snapshot } from 'chess/es';
import {
  TOGGLE_TURN,
  UPDATE_SNAPSHOT,
  UPDATE_SELECTED_CODE,
  COMPUTE_MOVABLE_TILES,
} from '../actionTypes';

const initialState = {
  turn: Turn.w,
  selectedCode: '',
  movableTiles: [],
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

    case COMPUTE_MOVABLE_TILES: {
      return {
        ...state,
        movableTiles: payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
