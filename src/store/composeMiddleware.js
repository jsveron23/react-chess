import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

function createComposeMiddleware (env) {
  return (...middlewares) => {
    const composedMiddleware = applyMiddleware(...middlewares)

    return env !== 'production'
      ? composeWithDevTools(composedMiddleware)
      : composedMiddleware
  }
}

const composeMiddleware = createComposeMiddleware(process.env.NODE_ENV)
composeMiddleware.withEnv = createComposeMiddleware

export default composeMiddleware
