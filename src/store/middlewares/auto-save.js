import { Storage } from '~/services/storage';
import { GAME_AUTOSAVE } from '~/presets';
import { setSheetData, removeSheetData } from '../slices/ingame';

const autoSave = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type === setSheetData.type) {
    const { ingame, general, ai } = store.getState();

    if (ingame.present.sheetData.length > 0) {
      Storage.setItem(GAME_AUTOSAVE, JSON.stringify({ ingame, general, ai }));
    } else {
      Storage.removeItem(GAME_AUTOSAVE);
    }
  } else if (action.type === removeSheetData.type) {
    Storage.removeItem(GAME_AUTOSAVE);
  }

  return result;
};

export { autoSave };
