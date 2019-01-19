import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

function composeMiddleware (env) {
  return (...middlewares) => {
    const composedMiddleware = applyMiddleware(...middlewares)

    return env !== 'production'
      ? composeWithDevTools(composedMiddleware)
      : composedMiddleware
  }
}

const applyComposeMiddleware = composeMiddleware(process.env.NODE_ENV)
applyComposeMiddleware.withEnv = composeMiddleware

export default applyComposeMiddleware
