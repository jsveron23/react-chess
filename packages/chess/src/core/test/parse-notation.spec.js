import { test, expect } from 'bun:test';
import { parseNotation } from '../parse-notation';

test('Pawn move → destination tile only', () => {
  expect(parseNotation({ from: ['wPe4'], to: ['wPe5'] })).toBe('e5');
});

test('Piece move → piece letter + destination tile', () => {
  expect(parseNotation({ from: ['wNf3'], to: ['wNe5'] })).toBe('Ne5');
});

test('Pawn capture → source file + x + destination', () => {
  expect(parseNotation({ from: ['wPe4', 'bPd5'], to: ['wPd5'] })).toBe('exd5');
});

test('Piece capture → piece letter + x + destination', () => {
  expect(parseNotation({ from: ['wNe5', 'bPd7'], to: ['wNd7'] })).toBe('Nxd7');
});

test('Kingside castling → O-O', () => {
  expect(parseNotation({ from: ['wKe1', 'wRh1'], to: ['wKg1', 'wRf1'] })).toBe(
    'O-O'
  );
});

test('Queenside castling → O-O-O', () => {
  expect(parseNotation({ from: ['wKe1', 'wRa1'], to: ['wKc1', 'wRd1'] })).toBe(
    'O-O-O'
  );
});

test('Move giving check appends +', () => {
  const checkData = { isCheck: true, isCheckmate: false, isStalemate: false };
  expect(parseNotation({ checkData, from: ['wRe1'], to: ['wRe8'] })).toBe(
    'Re8+'
  );
});

test('Checkmate appends #', () => {
  const checkData = { isCheck: false, isCheckmate: true, isStalemate: false };
  expect(parseNotation({ checkData, from: ['wRe1'], to: ['wRe8'] })).toBe(
    'Re8#'
  );
});

test('Stalemate appends $', () => {
  const checkData = { isCheck: false, isCheckmate: false, isStalemate: true };
  expect(parseNotation({ checkData, from: ['wRe1'], to: ['wRe8'] })).toBe(
    'Re8$'
  );
});

// H10
test('Ambiguous piece move → piece letter + destination (single source in from array)', () => {
  // The function receives the moving piece only; disambiguation is handled upstream
  expect(parseNotation({ from: ['wRa4'], to: ['wRd4'] })).toBe('Rd4');
});

// H11
test('Pawn promotion → promoted piece letter + destination tile', () => {
  // from contains the pawn, to contains the promoted piece code
  // parseNotation reads the promoted piece from the `to` code
  expect(parseNotation({ from: ['wPe7'], to: ['wQe8'] })).toBe('Qe8');
  expect(parseNotation({ from: ['wPe7'], to: ['wRe8'] })).toBe('Re8');
  expect(parseNotation({ from: ['wPe7'], to: ['wBe8'] })).toBe('Be8');
  expect(parseNotation({ from: ['wPe7'], to: ['wNe8'] })).toBe('Ne8');
});

// H12
test('En passant capture → source file + x + destination', () => {
  // from includes the moving pawn and the captured pawn; to has the landing tile only
  expect(parseNotation({ from: ['wPe5', 'bPd5'], to: ['wPd6'] })).toBe('exd6');
});
