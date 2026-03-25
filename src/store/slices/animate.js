import { createSlice } from '@reduxjs/toolkit';

const animateSlice = createSlice({
  name: 'animate',
  initialState: {
    targetCode: '',
    from: {
      x: 0,
      y: 0,
    },
  },
  reducers: {
    // primitive dispatched by measureAxis thunk
    setAxis: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setAxis } = animateSlice.actions;
export default animateSlice.reducer;
