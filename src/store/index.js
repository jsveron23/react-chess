import {
  createStore,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from '@reducers'

const composeMiddleware = (...middleware) => {
  middleware = applyMiddleware(...middleware)

  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(middleware)
  }

  return middleware
}

const configureStore = (initialState = { /* TODO localstorage */ }) => createStore(
  reducers,
  initialState,
  composeMiddleware(thunk)
)

export default configureStore()
