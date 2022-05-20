import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { identity } from 'ramda';
import { composeWithDevTools } from 'redux-devtools-extension';
import { IS_DEV, INSTANT_IMPORT_DATA, SAVE_GAME } from '~/presets';
import { Storage, Compression } from '~/utils';
import reducers from './reducers';

const composeDev = IS_DEV ? composeWithDevTools : identity;

function configureStore(preloadedState) {
  const middlewareEnhancer = applyMiddleware(thunk);
  const composedEnhancer = composeDev(middlewareEnhancer);
  const compressedData = Storage.getItem(INSTANT_IMPORT_DATA);
  let intitalState = preloadedState;
  let parsedData;

  if (compressedData) {
    try {
      parsedData = JSON.parse(Storage.getItem(SAVE_GAME));
      intitalState = JSON.parse(Compression.decompress(compressedData));
    } catch (err) {
      console.error(err);
    } finally {
      Storage.removeItem(INSTANT_IMPORT_DATA);
    }
  }

  return createStore(reducers, parsedData || intitalState, composedEnhancer);
}

export default configureStore;
