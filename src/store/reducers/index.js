import { combineReducers } from 'redux';
import general from './general';
import ingame from './ingame';

export default combineReducers({
  general,
  ingame,
});
