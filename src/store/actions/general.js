import { CHANGE_IS_OPENING } from '../actionTypes';

export function changeIsOpening(state) {
  return {
    type: CHANGE_IS_OPENING,
    payload: state,
  };
}
