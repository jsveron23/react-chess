import { createSlice } from '@reduxjs/toolkit';
import { Turn, Snapshot } from 'chess/es';

const ingameSlice = createSlice({
  name: 'ingame',
  initialState: {
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
  },
  reducers: {
    updateTurn: (state, action) => {
      state.turn = action.payload;
    },
    updateSnapshot: (state, action) => {
      state.snapshot = action.payload;
    },
    // primitive: set selectedCode directly (thunk updateSelectedCode dispatches this)
    setSelectedCode: (state, action) => {
      state.selectedCode = action.payload;
    },
    removeSelectedCode: (state) => {
      state.selectedCode = '';
    },
    // primitive: set movableTiles directly (thunk updateMovableTiles dispatches this)
    setMovableTiles: (state, action) => {
      state.movableTiles = action.payload;
    },
    removeMovableTiles: (state) => {
      state.movableTiles = [];
    },
    setCheckData: (state, action) => {
      state.checkData = action.payload;
    },
    // primitive: set sheetData directly (thunks updateSheetData/restoreSheetAnalysis dispatch this)
    setSheetData: (state, action) => {
      state.sheetData = action.payload;
    },
    removeSheetData: (state) => {
      state.sheetData = [];
    },
    removeCheck: (state) => {
      state.checkData = {
        isCheck: false,
        isStalemate: false,
        isCheckmate: false,
        kingCode: '',
        defenders: [],
        defendTiles: [],
        attackerCode: '',
        attackerRoutes: [],
        dodgeableTiles: [],
      };
    },
  },
});

export const {
  updateTurn,
  updateSnapshot,
  setSelectedCode,
  removeSelectedCode,
  setMovableTiles,
  removeMovableTiles,
  setCheckData,
  setSheetData,
  removeSheetData,
  removeCheck,
} = ingameSlice.actions;
export default ingameSlice.reducer;
