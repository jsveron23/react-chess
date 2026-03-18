import { configureStore as rtkConfigureStore } from '@reduxjs/toolkit';
import undoable, { includeAction } from 'redux-undo';
import { INSTANT_IMPORT_DATA, SAVE_GAME } from '~/presets';
import { Compression } from '~/services/io';
import { Storage } from '~/services/storage';
import { debug } from '~/utils';
import { crashReporter } from './middlewares';
import generalReducer from './slices/general';
import ingameReducer from './slices/ingame';
import aiReducer from './slices/ai';
import networkReducer from './slices/network';
import animateReducer from './slices/animate';
import { updateTurn } from './slices/ingame';

const configureStore = (preloadedState) => {
  let intitalState = preloadedState;

  try {
    const importData = Storage.getItem(INSTANT_IMPORT_DATA);
    const saveData = JSON.parse(Storage.getItem(SAVE_GAME));

    intitalState = importData
      ? JSON.parse(Compression.decompress(importData))
      : saveData || preloadedState;
  } catch (err) {
    debug.err('Redux - intital-state issue: ', err);
  } finally {
    Storage.removeItem(INSTANT_IMPORT_DATA);
  }

  return rtkConfigureStore({
    reducer: {
      ingame: undoable(ingameReducer, {
        limit: false,
        filter: includeAction(updateTurn.type),
      }),
      general: generalReducer,
      network: networkReducer,
      animate: animateReducer,
      ai: aiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }).concat(crashReporter),
    preloadedState: intitalState,
  });
};

export { configureStore };
