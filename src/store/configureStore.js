import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { identity } from 'ramda';
import { composeWithDevTools } from 'redux-devtools-extension';
import { isDev } from '~/config';
import reducers from './reducers';

const composeDev = isDev ? composeWithDevTools : identity;

function configureStore(preloadedState) {
  const middlewareEnhancer = applyMiddleware(thunk);
  const composedEnhancer = composeDev(middlewareEnhancer);
  const store = createStore(reducers, preloadedState, composedEnhancer);

  return store;
}

export default configureStore;
