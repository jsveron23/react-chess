import { Turn, Snapshot } from 'chess/es';
import {
  MEASURE_AXIS,
  UPDATE_TURN,
  UPDATE_SNAPSHOT,
  UPDATE_SHEET_DATA,
  UPDATE_CHECK_CODE,
  UPDATE_SELECTED_CODE,
  UPDATE_MOVABLE_TILES,
  REMOVE_CHECK,
  REMOVE_SELECTED_CODE,
  REMOVE_MOVABLE_TILES,
  REMOVE_SHEET_DATA,
} from '../actionTypes';

const initialState = {
  turn: Turn.w,
  selectedCode: '',
  movableTiles: [],
  snapshot: Snapshot,
  sheetData: [],
  animate: {
    code: '',
    from: {
      x: 0,
      y: 0,
    },
  },
  check: {
    to: '',
    from: '',
    routes: [],
    defenders: [],
    defendTiles: [],
    dodgeableTiles: [],
  },
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

    case UPDATE_CHECK_CODE: {
      return {
        ...state,
        check: payload,
      };
    }

    case UPDATE_SHEET_DATA: {
      return {
        ...state,
        sheetData: payload,
      };
    }

    case REMOVE_SHEET_DATA: {
      return {
        ...state,
        sheetData: [],
      };
    }

    case REMOVE_CHECK: {
      return {
        ...state,
        check: {
          to: '',
          from: '',
          routes: [],
          defenders: [],
          defendTiles: [],
          dodgeableTiles: [],
        },
      };
    }

    case MEASURE_AXIS: {
      return {
        ...state,
        animate: payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
