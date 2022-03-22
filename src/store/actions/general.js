import { UPDATE_MATCH_TYPE } from '../actionTypes';

export function updateMatchType(mKey) {
  return {
    type: UPDATE_MATCH_TYPE,
    payload: mKey,
  };
}
