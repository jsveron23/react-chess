import { UPDATE_MATCH_TYPE } from '../actionTypes';
import { restart } from '../batchActions';

export function updateMatchType(mKey) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_MATCH_TYPE,
      payload: mKey,
    });
    dispatch(restart());
  };
}
