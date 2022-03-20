import BlackBishop from './pieces/black_bishop.svg';
import BlackKing from './pieces/black_king.svg';
import BlackKnight from './pieces/black_knight.svg';
import BlackPawn from './pieces/black_pawn.svg';
import BlackQueen from './pieces/black_queen.svg';
import BlackRook from './pieces/black_rook.svg';
import WhiteBishop from './pieces/white_bishop.svg';
import WhiteKing from './pieces/white_king.svg';
import WhiteKnight from './pieces/white_knight.svg';
import WhitePawn from './pieces/white_pawn.svg';
import WhiteQueen from './pieces/white_queen.svg';
import WhiteRook from './pieces/white_rook.svg';

export function getPiece(key) {
  const map = {
    bB: BlackBishop,
    bK: BlackKing,
    bN: BlackKnight,
    bP: BlackPawn,
    bQ: BlackQueen,
    bR: BlackRook,
    wB: WhiteBishop,
    wK: WhiteKing,
    wN: WhiteKnight,
    wP: WhitePawn,
    wQ: WhiteQueen,
    wR: WhiteRook,
  };

  return map[key];
}

export * from './chess';
export {
  BlackBishop,
  BlackKing,
  BlackKnight,
  BlackPawn,
  BlackQueen,
  BlackRook,
  WhiteBishop,
  WhiteKing,
  WhiteKnight,
  WhitePawn,
  WhiteQueen,
  WhiteRook,
};
