import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { identity } from 'ramda';
import { composeWithDevTools } from 'redux-devtools-extension';
import { isDev } from '~/config';
import { Storage } from '~/utils';
import reducers from './reducers';
import { networkSupport } from './networkSupport';

const composeDev = isDev ? composeWithDevTools : identity;

function configureStore(preloadedState) {
  const parsedData = Storage.getItem('save-game');
  const middlewareEnhancer = applyMiddleware(thunk);
  const composedEnhancer = composeDev(middlewareEnhancer);
  const store = createStore(
    reducers,
    parsedData || preloadedState,
    composedEnhancer
  );

  return networkSupport(store);
}

export default configureStore;
