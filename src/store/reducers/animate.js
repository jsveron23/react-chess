import { MEASURE_AXIS } from '../action-types';

const initialState = {
  targetCode: '',
  from: {
    x: 0,
    y: 0,
  },
};

/**
 * Animate reducer
 * @param {object} state - Current state
 * @param {object} action - Dispatched action
 * @return {object} Next state
 */
const animateReducer = (state = initialState, action) => {
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
};

export { animateReducer };
