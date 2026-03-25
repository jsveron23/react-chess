import { test, expect } from 'bun:test';
import { computeRawMT } from '../compute-raw-mt';

test('Pawn at starting rank includes forward move and double step', () => {
  const timeline = [['wKe1', 'wPe2']];
  const result = computeRawMT(timeline, 'wPe2');

  expect(result).toContain('e3');
  expect(result).toContain('e4');
});

test('Pawn not at starting rank has no double step', () => {
  const timeline = [['wKe1', 'wPe3']];
  const result = computeRawMT(timeline, 'wPe3');

  expect(result).toContain('e4');
  expect(result).not.toContain('e5'); // double step would be e5 — not available
});

test('Knight returns all valid L-shaped tiles from corner', () => {
  const timeline = [['wKe1', 'wNg1']];
  const result = computeRawMT(timeline, 'wNg1');

  expect(result).toContain('f3');
  expect(result).toContain('h3');
  expect(result).toContain('e2');
  // off-board L-shapes are absent
  expect(result).not.toContain('i2');
});

test('Rook on open board reaches all tiles along rank and file', () => {
  const timeline = [['wKe1', 'wRa8']];
  const result = computeRawMT(timeline, 'wRa8');

  // along rank 8
  expect(result).toContain('b8');
  expect(result).toContain('h8');
  // along a-file downward
  expect(result).toContain('a7');
  expect(result).toContain('a1');
});

test('Pawn blocked by own piece cannot reach tiles beyond the blocker', () => {
  // White pawn at e3 blocks white pawn at e2 — raw MT still includes e3 (own-piece
  // filtering happens downstream), but e4 is cut off because e3 is occupied
  const timeline = [['wKe1', 'wPe2', 'wPe3']];
  const result = computeRawMT(timeline, 'wPe2');

  expect(result).not.toContain('e4');
});

// A9
test('Knight can jump over pieces to reach L-shaped destinations', () => {
  // Own pawns at f2, g2, h2 surround the knight but cannot block it
  const timeline = [['wKe1', 'wNg1', 'wPf2', 'wPg2', 'wPh2']];
  const result = computeRawMT(timeline, 'wNg1');

  expect(result).toContain('f3');
  expect(result).toContain('h3');
  expect(result).toContain('e2');
});

// A13
test('King can move to any adjacent square from the centre when unobstructed', () => {
  const timeline = [['wKe4', 'bKe8']];
  const result = computeRawMT(timeline, 'wKe4');

  expect(result).toContain('d4');
  expect(result).toContain('f4');
  expect(result).toContain('e5');
  expect(result).toContain('e3');
  expect(result).toContain('d5');
  expect(result).toContain('f5');
  expect(result).toContain('d3');
  expect(result).toContain('f3');
});
