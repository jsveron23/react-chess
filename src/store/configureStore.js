import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { identity } from 'ramda';
import { composeWithDevTools } from 'redux-devtools-extension';
import { isDev } from '~/config';
import { getItem } from '~/utils/localStorage';
import reducers from './reducers';

const composeDev = isDev ? composeWithDevTools : identity;

function configureStore(preloadedState) {
  const parsedData = getItem('save-game');
  const middlewareEnhancer = applyMiddleware(thunk);
  const composedEnhancer = composeDev(middlewareEnhancer);
  const store = createStore(
    reducers,
    parsedData || preloadedState,
    composedEnhancer
  );

  return store;
}

export default configureStore;
