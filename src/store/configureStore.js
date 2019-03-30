import thunk from 'redux-thunk'
import * as R from 'ramda'
import reducers from '~/reducers'
import { createStore } from '~/externals'
import composeMiddleware from './composeMiddleware'

function configureStore (initialState = {}) {
  return R.compose(
    createStore(reducers, initialState),
    composeMiddleware
  )(thunk)
}

export default configureStore
