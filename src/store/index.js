import { createStore } from 'redux'
import thunk from 'redux-thunk'
import composeMiddleware from './composeMiddleware'
import reducers from '~/reducers'

const configureStore = (initialState = {}) => {
  const middleware = composeMiddleware(thunk)

  return createStore(reducers, initialState, middleware)
}

const store = configureStore()
store.withInitialState = configureStore

export default store
