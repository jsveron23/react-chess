import { createStore } from 'redux'
import thunk from 'redux-thunk'
import composeMiddleware from './composeMiddleware'

const configureStore = (initialState = {}) => {
  const middleware = composeMiddleware(thunk)
  const reducer = function () {}

  return createStore(reducer, initialState, middleware)
}

const store = configureStore()
store.withInitialState = configureStore

export default store
