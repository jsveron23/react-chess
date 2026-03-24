import { configureStore as rtkConfigureStore } from '@reduxjs/toolkit';
import undoable, { includeAction } from 'redux-undo';
import { INSTANT_IMPORT_DATA, GAME_AUTOSAVE } from '~/presets';
import { Compression } from '~/services/io';
import { Storage } from '~/services/storage';
import { debug } from '~/utils';
import { crashReporter, autoSave } from './middlewares';
import generalReducer from './slices/general';
import ingameReducer from './slices/ingame';
import aiReducer from './slices/ai';
import animateReducer from './slices/animate';
import analysisReducer from './slices/analysis';
import hintReducer from './slices/hint';
import { updateTurn } from './slices/ingame';

const configureStore = (preloadedState) => {
  let intitalState = preloadedState;

  try {
    const importData = Storage.getItem(INSTANT_IMPORT_DATA);
    const autosaveData = Storage.getItem(GAME_AUTOSAVE);

    if (importData) {
      intitalState = JSON.parse(Compression.decompress(importData));
    } else if (autosaveData) {
      const parsed = JSON.parse(autosaveData);
      intitalState = {
        ...parsed,
        ai: { ...parsed.ai, thinking: false },
      };
    }
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
      hint: hintReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }).concat(crashReporter, autoSave),
    preloadedState: intitalState,
  });
};

export { configureStore };
