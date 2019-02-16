import { createStore } from 'redux'
import thunk from 'redux-thunk'
import { compose, curry } from 'ramda'
import reducers from '~/reducers'
import composeMiddleware from './composeMiddleware'

const curriedCreateStore = curry(createStore)

const configureStore = (initialState = {}) =>
  compose(
    curriedCreateStore(reducers, initialState),
    composeMiddleware
  )(thunk)

const store = configureStore()
store.withState = configureStore

export default store
