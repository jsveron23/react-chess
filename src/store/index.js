import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '@reducers'

/**
 * Configure Store
 * @return {Object}
 */
function configureStore () {
  let middleware = applyMiddleware(thunk)

  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')

    middleware = composeWithDevTools(middleware)
  }

  return createStore(reducers, middleware)
}

export default configureStore()
