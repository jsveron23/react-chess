import { createSlice } from '@reduxjs/toolkit';
import { ONE_VS_ONE } from '~/presets';

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    matchType: ONE_VS_ONE,
    flip: false,
    lastSaved: 0,
  },
  reducers: {
    updateMatchType: (state, action) => {
      state.matchType = action.payload;
    },
    saveToLocalstorage: (state, action) => {
      state.lastSaved = action.payload;
    },
    toggleFlip: (state) => {
      state.flip = !state.flip;
    },
  },
});

export const { updateMatchType, saveToLocalstorage, toggleFlip } =
  generalSlice.actions;
export default generalSlice.reducer;
