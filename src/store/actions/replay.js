import { Turn } from 'chess/es';
import { Storage } from '~/services/storage';
import { SAVED_GAMES } from '~/presets';
import {
  addSavedGame,
  setSavedGames,
  deleteGame as deleteGameFromState,
} from '../slices/replay';

const stripAnalysis = (side) => {
  if (!side) {
    return side;
  }
  const rest = { ...side };
  delete rest.topMoves;
  delete rest.breakdown;

  return rest;
};

export const saveGame = () => (dispatch, getState) => {
  const state = getState();
  const { past, present } = state.ingame;
  const { matchType } = state.general;
  const { turn, checkData } = present;

  const snapshots = [...past.map((s) => s.snapshot), present.snapshot];
  const checkDataList = [...past.map((s) => s.checkData), present.checkData];
  const savedSheetData = present.sheetData.map((row) => ({
    white: stripAnalysis(row.white),
    black: stripAnalysis(row.black),
  }));

  const winner = checkData.isStalemate
    ? 'Draw'
    : turn === Turn.w
    ? 'Black'
    : 'White';

  const game = {
    id: Date.now(),
    date: new Date().toISOString(),
    winner,
    matchType,
    snapshots,
    checkDataList,
    sheetData: savedSheetData,
  };

  const existing = Storage.getItem(SAVED_GAMES);
  const games = existing ? JSON.parse(existing) : [];
  const updated = [game, ...games];
  Storage.setItem(SAVED_GAMES, JSON.stringify(updated));

  dispatch(addSavedGame(game));
};

export const deleteSavedGame = (id) => (dispatch, getState) => {
  dispatch(deleteGameFromState(id));
  const updated = getState().replay.savedGames;
  Storage.setItem(SAVED_GAMES, JSON.stringify(updated));
};

export const loadSavedGames = () => (dispatch) => {
  const existing = Storage.getItem(SAVED_GAMES);
  const games = existing ? JSON.parse(existing) : [];
  dispatch(setSavedGames(games));
};
