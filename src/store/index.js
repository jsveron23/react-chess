import { createStore } from 'redux'
import thunk from 'redux-thunk'
import reducers from '~/reducers'
import composeMiddleware from './composeMiddleware'

const configureStore = (initialState = {}) => {
  const middleware = composeMiddleware(thunk)

  return createStore(reducers, initialState, middleware)
}

const store = configureStore()
store.withInitialState = configureStore

export default store
