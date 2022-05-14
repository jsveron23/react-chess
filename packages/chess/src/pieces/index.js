import BlackBishop from './black_bishop.svg';
import BlackKing from './black_king.svg';
import BlackKnight from './black_knight.svg';
import BlackPawn from './black_pawn.svg';
import BlackQueen from './black_queen.svg';
import BlackRook from './black_rook.svg';
import WhiteBishop from './white_bishop.svg';
import WhiteKing from './white_king.svg';
import WhiteKnight from './white_knight.svg';
import WhitePawn from './white_pawn.svg';
import WhiteQueen from './white_queen.svg';
import WhiteRook from './white_rook.svg';

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
