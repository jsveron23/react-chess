import { combineReducers } from 'redux'
import undoable, { ActionTypes, includeAction } from 'redux-undo'
import { TOGGLE_TURN } from '~/actions'
import general from './general'
import ingame from './ingame'

export default combineReducers({
  general,
  ingame: undoable(ingame, {
    limit: false,
    undoType: ActionTypes.UNDO,
    filter: includeAction(TOGGLE_TURN)
  })
})
