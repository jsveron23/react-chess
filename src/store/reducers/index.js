import { combineReducers } from 'redux';
import undoable, { ActionTypes, includeAction } from 'redux-undo';
import general from './general';
import ingame from './ingame';
import { TOGGLE_TURN } from '../actionTypes';

export default combineReducers({
  general,
  ingame: undoable(ingame, {
    limit: false,
    undoType: ActionTypes.UNDO,
    filter: includeAction(TOGGLE_TURN),
  }),
});
