import { test, expect } from 'bun:test';
import { computeCheckState } from '../compute-check-state';

test('Normal position → no check, no checkmate, no stalemate', () => {
  const timeline = [['wKe1', 'wPe2', 'bKe8', 'bPe7']];
  const result = computeCheckState('bPe7', timeline);

  expect(result.isCheck).toBe(false);
  expect(result.isCheckmate).toBe(false);
  expect(result.isStalemate).toBe(false);
});

test('Returns isCheck when king is under attack', () => {
  // bRe8 just moved to e1, putting wKe1... wait, need king in a different spot
  // bRe8 attacks wKe1 — black rook on e-file, white king on e1
  const timeline = [['wKe1', 'bRe8', 'bKa8']];
  const result = computeCheckState('bRe8', timeline);

  expect(result.isCheck).toBe(true);
  expect(result.data.attackerCode).toBe('bRe8');
  expect(result.data.kingCode).toBe('wKe1');
});

test('Returns isCheckmate for back-rank mate', () => {
  // wKh1 cornered: bRe1 gives check, bRa2 covers all escape squares
  const timeline = [['wKh1', 'bRe1', 'bRa2', 'bKa8']];
  const result = computeCheckState('bRe1', timeline);

  expect(result.isCheck).toBe(true);
  expect(result.isCheckmate).toBe(true);
});

test('Returns isStalemate when no legal moves but not in check', () => {
  // wKh8 surrounded: bQg6 covers all adjacent squares without attacking h8
  const timeline = [['wKh8', 'bQg6', 'bKa1']];
  const result = computeCheckState('bQg6', timeline);

  expect(result.isCheck).toBe(false);
  expect(result.isStalemate).toBe(true);
});

// B7
test('King in check cannot castle — dodgeable tiles exclude castling squares', () => {
  // bRe8 checks wKe1 along the e-file; white still has unmoved rooks for castling
  // but getCastlingTiles is skipped when king is in check
  const timeline = [['wKe1', 'wRa1', 'wRh1', 'bRe8', 'bKa8']];
  const result = computeCheckState('bRe8', timeline);

  expect(result.isCheck).toBe(true);
  expect(result.data.dodgeableTiles).not.toContain('c1');
  expect(result.data.dodgeableTiles).not.toContain('g1');
});

// C2
test('Double check — isCheck is true and defenders list is empty', () => {
  // bRe8 attacks wKe1 along the e-file; bBb4 attacks along the b4-e1 diagonal
  // With two simultaneous attackers, no single piece can block both lines
  const timeline = [['wKe1', 'bRe8', 'bBb4', 'bKh8']];
  const result = computeCheckState('bBb4', timeline);

  expect(result.isCheck).toBe(true);
  expect(result.data.defenders).toEqual([]);
  expect(result.data.defendTiles).toEqual([]);
});

// C5
test('Returns isCheck when king is attacked by a knight', () => {
  // bNd3 reaches e1 via an L-shape (file +1, rank -2)
  const timeline = [['wKe1', 'bNd3', 'bKa8']];
  const result = computeCheckState('bNd3', timeline);

  expect(result.isCheck).toBe(true);
  expect(result.data.attackerCode).toBe('bNd3');
});

// C6
test('Returns isCheck when king is attacked by a pawn', () => {
  // Black pawn at d2 attacks e1 diagonally (black pawns attack downward)
  const timeline = [['wKe1', 'bPd2', 'bKa8']];
  const result = computeCheckState('bPd2', timeline);

  expect(result.isCheck).toBe(true);
  expect(result.data.attackerCode).toBe('bPd2');
});

// D2
test("Scholar's mate — queen and bishop deliver checkmate", () => {
  // wQf7 checks bKe8 diagonally; wBc4 protects the queen and cuts off d5
  // bKe8 escape: d8 (own queen), d7/e7 (Qf7 rank 7), f8 (Qf7 f-file), f7 (protected by Bc4)
  const timeline = [['wKe1', 'wQf7', 'wBc4', 'bKe8', 'bQd8', 'bNc6']];
  const result = computeCheckState('wQf7', timeline);

  expect(result.isCheck).toBe(true);
  expect(result.isCheckmate).toBe(true);
});

// D3
test('Smothered mate — knight checkmate with king surrounded by own pieces', () => {
  // wNf7 checks bKh8; all escape squares blocked by bRg8, bRh7, bPg7
  // Knight attacks cannot be interposed — only capture or king move possible
  const timeline = [['wKa1', 'wNf7', 'bKh8', 'bRg8', 'bRh7', 'bPg7']];
  const result = computeCheckState('wNf7', timeline);

  expect(result.isCheck).toBe(true);
  expect(result.isCheckmate).toBe(true);
});

// D4
test('Two-rook checkmate — ladder mate', () => {
  // wRa8 checks bKe8 along rank 8; wRb7 covers entire rank 7 (all king escape squares)
  const timeline = [['wKa1', 'wRa8', 'wRb7', 'bKe8']];
  const result = computeCheckState('wRa8', timeline);

  expect(result.isCheck).toBe(true);
  expect(result.isCheckmate).toBe(true);
});

// D5
test("Anastasia's mate — rook and knight checkmate on the h-file", () => {
  // wRh1 checks bKh8 along the h-file; wNg5 covers h7; bPg8/bPg7 smother the king
  const timeline = [['wKa1', 'wRh1', 'wNg5', 'bKh8', 'bPg8', 'bPg7']];
  const result = computeCheckState('wRh1', timeline);

  expect(result.isCheck).toBe(true);
  expect(result.isCheckmate).toBe(true);
});

// E2
test('Stalemate with a pawn controlling exit squares', () => {
  // bKh8: g8 attacked by wQg6 (g-file), g7 attacked by wQg6 (g-file), h7 occupied by wPh7
  // wPh7 is protected by wQg6 diagonally — bK cannot capture it
  const timeline = [['wKe1', 'wQg6', 'wPh7', 'bKh8']];
  const result = computeCheckState('wQg6', timeline);

  expect(result.isCheck).toBe(false);
  expect(result.isStalemate).toBe(true);
});

// G1
test('Piece can block check by interposing along the attack route', () => {
  // bRe8 checks wKe1; wRa4 can slide to e4 to interpose on the e-file
  const timeline = [['wKe1', 'bRe8', 'wRa4', 'bKa8']];
  const result = computeCheckState('bRe8', timeline);

  expect(result.isCheck).toBe(true);
  expect(result.isCheckmate).toBe(false);
  expect(result.data.defenders).toContain('wRa4');
  expect(result.data.defendTiles).toContain('e4');
});

// G2
test('Defender can capture the checking piece to resolve check', () => {
  // bRe2 checks wKe1 (adjacent on e-file); wRa2 can capture bRe2 along rank 2
  const timeline = [['wKe1', 'bRe2', 'wRa2', 'bKa8']];
  const result = computeCheckState('bRe2', timeline);

  expect(result.isCheck).toBe(true);
  expect(result.isCheckmate).toBe(false);
  expect(result.data.defenders).toContain('wRa2');
  expect(result.data.defendTiles).toContain('e2');
});

// G5
test('Double check — friendly piece with coverage cannot defend when two attackers exist', () => {
  // wRa4 could block the rook attack on its own, but cannot block both
  // bRe8 and bBb4 simultaneously — defenders must be empty
  const timeline = [['wKe1', 'bRe8', 'bBb4', 'bKh8', 'wRa4']];
  const result = computeCheckState('bBb4', timeline);

  expect(result.isCheck).toBe(true);
  expect(result.data.defenders).toEqual([]);
  expect(result.data.defendTiles).toEqual([]);
});
