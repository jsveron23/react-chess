import { MEASURE_AXIS } from '../actionTypes';

const initialState = {
  targetCode: '',
  from: {
    x: 0,
    y: 0,
  },
};

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MEASURE_AXIS: {
      return {
        ...state,
        ...payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
