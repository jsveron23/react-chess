import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import general from './general';
import ingame from './ingame';
import network from './network';
import animate from './animate';
import ai from './ai';
import { UPDATE_TURN } from '../actionTypes';

export default combineReducers({
  ingame: undoable(ingame, {
    limit: false,
    filter: includeAction(UPDATE_TURN),
  }),
  general,
  network,
  animate,
  ai,
});
