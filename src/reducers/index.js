import { combineReducers } from 'redux'
import general from './general'
import notations from './notations'
import records from './records'
import movable from './movable'

export default combineReducers({
  general,
  notations,
  records,
  movable
})
