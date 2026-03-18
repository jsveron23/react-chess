import { configureStore as rtkConfigureStore } from '@reduxjs/toolkit';
import undoable, { includeAction } from 'redux-undo';
import { INSTANT_IMPORT_DATA } from '~/presets';
import { Compression } from '~/services/io';
import { Storage } from '~/services/storage';
import { debug } from '~/utils';
import { crashReporter } from './middlewares';
import generalReducer from './slices/general';
import ingameReducer from './slices/ingame';
import aiReducer from './slices/ai';
import animateReducer from './slices/animate';
import analysisReducer from './slices/analysis';
import { updateTurn } from './slices/ingame';

const configureStore = (preloadedState) => {
  let intitalState = preloadedState;

  try {
    const importData = Storage.getItem(INSTANT_IMPORT_DATA);

    intitalState = importData
      ? JSON.parse(Compression.decompress(importData))
      : preloadedState;
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
      animate: animateReducer,
      ai: aiReducer,
      analysis: analysisReducer,
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
