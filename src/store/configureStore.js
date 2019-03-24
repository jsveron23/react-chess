import { createStore } from 'redux'
import thunk from 'redux-thunk'
import * as R from 'ramda'
import reducers from '~/reducers'
import composeMiddleware from './composeMiddleware'

const curriedCreateStore = R.curry(createStore)

function configureStore (initialState = {}) {
  return R.compose(
    curriedCreateStore(reducers, initialState),
    composeMiddleware
  )(thunk)
}

export default configureStore
