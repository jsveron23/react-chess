import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { identity } from 'ramda';
import { composeWithDevTools } from 'redux-devtools-extension';
import { isDev } from '~/config';
import { Storage, decompress } from '~/utils';
import reducers from './reducers';

const composeDev = isDev ? composeWithDevTools : identity;

function configureStore(preloadedState) {
  const middlewareEnhancer = applyMiddleware(thunk);
  const composedEnhancer = composeDev(middlewareEnhancer);
  const parsedData = JSON.parse(Storage.getItem('save-game'));
  const compressedData = Storage.getItem('instant-import-data');
  let intitalState = preloadedState;

  if (compressedData) {
    try {
      intitalState = JSON.parse(decompress(compressedData));
    } catch (err) {
      console.error(err);
    } finally {
      Storage.removeItem('instant-import-data');
    }
  }

  return createStore(reducers, parsedData || intitalState, composedEnhancer);
}

export default configureStore;
