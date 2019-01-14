import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

export default function composeMiddleware (...middlewares) {
  const composedMiddleware = applyMiddleware(...middlewares)

  return process.env.NODE_ENV !== 'production'
    ? composeWithDevTools(composedMiddleware)
    : composedMiddleware
}
