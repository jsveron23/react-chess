import { Turn, Snapshot } from 'chess/es';
import * as types from '../actionTypes';

const initialState = {
  turn: Turn.w,
  snapshot: Snapshot,
  selectedCode: '',
  movableTiles: [],
  sheetData: [],
  checkData: {
    isCheck: false,
    isCheckmate: false,
    isStalemate: false,
    kingCode: '',
    defenders: [],
    defendTiles: [],
    attackerCode: '',
    attackerRoutes: [],
    dodgeableTiles: [],
  },
};

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.UPDATE_TURN: {
      return {
        ...state,
        turn: payload,
      };
    }

    case types.UPDATE_SNAPSHOT: {
      return {
        ...state,
        snapshot: payload,
      };
    }

    case types.UPDATE_SELECTED_CODE: {
      return {
        ...state,
        selectedCode: payload,
      };
    }

    case types.REMOVE_SELECTED_CODE: {
      return {
        ...state,
        selectedCode: '',
      };
    }

    case types.UPDATE_MOVABLE_TILES: {
      return {
        ...state,
        movableTiles: payload,
      };
    }

    case types.REMOVE_MOVABLE_TILES: {
      return {
        ...state,
        movableTiles: [],
      };
    }

    case types.UPDATE_CHECK_CODE: {
      return {
        ...state,
        checkData: payload,
      };
    }

    case types.UPDATE_SHEET_DATA: {
      return {
        ...state,
        sheetData: payload,
      };
    }

    case types.REMOVE_SHEET_DATA: {
      return {
        ...state,
        sheetData: [],
      };
    }

    case types.REMOVE_CHECK: {
      return {
        ...state,
        checkData: {
          isCheck: false,
          isStalemate: false,
          isCheckmate: false,
          kingCode: '',
          defenders: [],
          defendTiles: [],
          attackerCode: '',
          attackerRoutes: [],
          dodgeableTiles: [],
        },
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
