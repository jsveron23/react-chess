import { Turn, Snapshot } from 'chess/es';
import {
  UPDATE_TURN,
  UPDATE_SNAPSHOT,
  UPDATE_SELECTED_CODE,
  REMOVE_SELECTED_CODE,
  UPDATE_MOVABLE_TILES,
  REMOVE_MOVABLE_TILES,
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
    case UPDATE_TURN: {
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

    case REMOVE_SELECTED_CODE: {
      return {
        ...state,
        selectedCode: '',
      };
    }

    case UPDATE_MOVABLE_TILES: {
      return {
        ...state,
        movableTiles: payload,
      };
    }

    case REMOVE_MOVABLE_TILES: {
      return {
        ...state,
        movableTiles: [],
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
