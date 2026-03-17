import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import { generalReducer } from './general';
import { ingameReducer } from './ingame';
import { networkReducer } from './network';
import { animateReducer } from './animate';
import { aiReducer } from './ai';
import { UPDATE_TURN } from '../action-types';

const rootReducer = combineReducers({
  ingame: undoable(ingameReducer, {
    limit: false,
    filter: includeAction(UPDATE_TURN),
  }),
  general: generalReducer,
  network: networkReducer,
  animate: animateReducer,
  ai: aiReducer,
});

export { rootReducer };
