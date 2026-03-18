import { ActionCreators } from 'redux-undo';
import { Snapshot, Turn, parseNotation } from 'chess/es';
import { debug } from '~/utils';
import { Compression } from '~/services/io';
import { Storage } from '~/services/storage';
import { INSTANT_IMPORT_DATA } from '~/presets';
import {
  updateTurn,
  updateSnapshot,
  removeCheck,
  removeSelectedCode,
  removeMovableTiles,
  removeSheetData,
} from './ingame';
import { updateMatchType as setMatchType, toggleFlip } from '../slices/general';
import { resetAnalysis } from '../slices/analysis';

export { toggleFlip };

/**
 * Update match type and reset game state
 * @param {string} key - Match type key
 * @return {Function} Thunk
 */
export function updateMatchType(key) {
  return (dispatch) => {
    dispatch(setMatchType(key));
    dispatch(updateSnapshot(Snapshot));
    dispatch(removeSelectedCode());
    dispatch(removeMovableTiles());
    dispatch(removeCheck());
    dispatch(removeSheetData());
    dispatch(updateTurn(Turn.w));
    dispatch(resetAnalysis());
    dispatch(ActionCreators.clearHistory());
  };
}

/**
 * Import game from clipboard paste
 * @return {void}
 */
export function importGame() {
  const data = window.prompt('Paste export data here!');

  if (data) {
    Storage.setItem(INSTANT_IMPORT_DATA, data);
    window.location.reload();
  }
}

/**
 * Export game state to clipboard
 * @return {Function} Thunk
 */
export function exportGame() {
  return (dispatch, getState) => {
    dispatch(removeSelectedCode());
    dispatch(removeMovableTiles());

    const { general, ingame } = getState();
    const data = {
      ingame,
      general,
    };

    // TODO ask save current game before

    navigator.clipboard.writeText(Compression.compress(data)).then(() => {
      alert('Copied current playing data to clipboard!');
    }, debug.err('clipboard issue'));
  };
}

/**
 * Export current game as PGN to clipboard
 * @return {Function} Thunk
 */
export function exportGameAsPgn() {
  return (dispatch, getState) => {
    dispatch(removeSelectedCode());
    dispatch(removeMovableTiles());

    const {
      ingame: {
        present: { sheetData },
      },
    } = getState();

    const today = new Date();
    const dateStr = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0'),
    ].join('.');

    const headers = [
      '[Event "?"]',
      '[Site "react-chess"]',
      `[Date "${dateStr}"]`,
      '[Round "?"]',
      '[White "?"]',
      '[Black "?"]',
      '[Result "*"]',
    ].join('\n');

    const moves = sheetData
      .map(({ white, black }, idx) => {
        const moveNum = `${idx + 1}.`;
        const whiteNotation = white ? parseNotation(white) : '';
        const blackNotation = black ? parseNotation(black) : '';

        return `${moveNum} ${whiteNotation}${
          blackNotation ? ` ${blackNotation}` : ''
        }`;
      })
      .join(' ');

    const pgn = `${headers}\n\n${moves} *`;

    navigator.clipboard.writeText(pgn).then(() => {
      alert('Copied PGN to clipboard!');
    }, debug.err('clipboard issue'));
  };
}

/**
 * Export current position as FEN to clipboard
 * @return {Function} Thunk
 */
export function exportGameAsFen() {
  return (dispatch, getState) => {
    dispatch(removeSelectedCode());
    dispatch(removeMovableTiles());

    const {
      ingame: {
        present: { snapshot, turn },
        past,
      },
    } = getState();

    // Build tile → piece code map (tile = file+rank, e.g. 'e4')
    const tileMap = {};
    snapshot.forEach((code) => {
      tileMap[code.slice(2)] = code;
    });

    // Piece placement: ranks 8→1, files a→h
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

    const placement = ranks
      .map((rank) => {
        let empty = 0;
        let row = '';

        files.forEach((file) => {
          const code = tileMap[`${file}${rank}`];

          if (code) {
            if (empty > 0) {
              row += empty;
              empty = 0;
            }
            const piece = code[1]; // K Q R B N P
            row += code[0] === 'w' ? piece.toUpperCase() : piece.toLowerCase();
          } else {
            empty++;
          }
        });

        if (empty > 0) row += empty;

        return row;
      })
      .join('/');

    // Castling rights (inferred from king/rook positions)
    let castling = '';
    if (tileMap['e1'] && tileMap['e1'][1] === 'K') {
      if (tileMap['h1'] === 'wRh1') castling += 'K';
      if (tileMap['a1'] === 'wRa1') castling += 'Q';
    }
    if (tileMap['e8'] && tileMap['e8'][1] === 'K') {
      if (tileMap['h8'] === 'bRh8') castling += 'k';
      if (tileMap['a8'] === 'bRa8') castling += 'q';
    }
    if (!castling) castling = '-';

    // En passant: detect if the last move was a pawn double push
    let enPassant = '-';
    if (past.length > 0) {
      const prevTileMap = {};
      past[past.length - 1].snapshot.forEach((code) => {
        prevTileMap[code.slice(2)] = code;
      });

      // Side that just moved is opposite of whose turn it is now
      const movedSide = turn === 'w' ? 'b' : 'w';

      files.forEach((file) => {
        if (movedSide === 'w') {
          // White pawn double push: rank 2 → rank 4
          if (
            prevTileMap[`${file}2`] === `wP${file}2` &&
            tileMap[`${file}4`] === `wP${file}4`
          ) {
            enPassant = `${file}3`;
          }
        } else {
          // Black pawn double push: rank 7 → rank 5
          if (
            prevTileMap[`${file}7`] === `bP${file}7` &&
            tileMap[`${file}5`] === `bP${file}5`
          ) {
            enPassant = `${file}6`;
          }
        }
      });
    }

    const halfmove = 0;
    const fullmove = Math.floor(past.length / 2) + 1;

    const fen = `${placement} ${turn} ${castling} ${enPassant} ${halfmove} ${fullmove}`;

    navigator.clipboard.writeText(fen).then(() => {
      alert('Copied FEN to clipboard!');
    }, debug.err('clipboard issue'));
  };
}
