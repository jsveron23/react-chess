import * as R from 'ramda'
import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

/**
 * @param  {String}   env
 * @return {Function}
 */
function createComposeMiddleware (env) {
  const devToolsWapper = env !== 'production' ? composeWithDevTools : R.identity

  return R.compose(
    devToolsWapper,
    applyMiddleware
  )
}

const composeMiddleware = createComposeMiddleware(process.env.NODE_ENV)

export default composeMiddleware
