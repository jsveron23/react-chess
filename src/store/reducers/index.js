import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import general from './general';
import ingame from './ingame';
import network from './network';
import { UPDATE_TURN } from '../actionTypes';

export default combineReducers({
  general,
  network,
  ingame: undoable(ingame, {
    limit: false,
    filter: includeAction(UPDATE_TURN),
  }),
});
