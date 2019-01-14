import {
  createStore,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const composeMiddleware = (...middleware) => {
  middleware = applyMiddleware(...middleware)

  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(middleware)
  }

  return middleware
}

const configureStore = (initialState = {}) => {
  return createStore(
    function () {},
    initialState,
    composeMiddleware(thunk)
  )
}

const store = configureStore()
store.withInitialState = configureStore

export default store
