import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { compose, apply, identity } from 'ramda';
import { composeWithDevTools } from 'redux-devtools-extension';
import { IS_DEV, INSTANT_IMPORT_DATA, SAVE_GAME } from '~/presets';
import { Compression } from '~/services/io';
import { Storage } from '~/services/storage';
import { debug } from '~/utils';
import reducers from './reducers';
import { crashReporter } from './middlewares';

const composeDev = IS_DEV ? composeWithDevTools : identity;

function configureStore(preloadedState) {
  const importData = Storage.getItem(INSTANT_IMPORT_DATA);
  const saveData = JSON.parse(Storage.getItem(SAVE_GAME));
  let intitalState = saveData || preloadedState;

  if (importData) {
    try {
      intitalState = JSON.parse(Compression.decompress(importData));
    } catch (err) {
      debug.err('Redux - intital-state issue: ', err);
    } finally {
      Storage.removeItem(INSTANT_IMPORT_DATA);
    }
  }

  return createStore(
    reducers,
    intitalState,
    compose(composeDev, apply(applyMiddleware))([thunk, crashReporter])
  );
}

export default configureStore;
