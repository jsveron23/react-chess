import { createSlice } from '@reduxjs/toolkit';
import { ONE_VS_ONE } from '~/presets';

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    matchType: ONE_VS_ONE,
    flip: false,
  },
  reducers: {
    updateMatchType: (state, action) => {
      state.matchType = action.payload;
    },
    toggleFlip: (state) => {
      state.flip = !state.flip;
    },
  },
});

export const { updateMatchType, toggleFlip } = generalSlice.actions;
export default generalSlice.reducer;
