import { createStore } from 'redux'
import thunk from 'redux-thunk'
import * as R from 'ramda'
import reducers from '~/reducers'
import composeMiddleware from './composeMiddleware'

const curriedCreateStore = R.curry(createStore)

const configureStore = (initialState = {}) =>
  R.compose(
    curriedCreateStore(reducers, initialState),
    composeMiddleware
  )(thunk)

const store = configureStore()
store.withState = configureStore

export default store
