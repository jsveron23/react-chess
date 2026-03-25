import { test, expect } from 'bun:test';
import { getCastlingTiles } from '../get-castling-tiles';

test('Returns both castling tiles when all conditions are met', () => {
  // Single snapshot = king and rooks never moved
  const timeline = [['wKe1', 'wRa1', 'wRh1']];
  const result = getCastlingTiles(timeline, 'wKe1');

  expect(result).toContain('c1'); // queenside
  expect(result).toContain('g1'); // kingside
});

test('Returns empty when king has moved', () => {
  // King was at d1, moved to e1 — not in all snapshots as wKe1
  const timeline = [
    ['wKe1', 'wRa1', 'wRh1'],
    ['wKd1', 'wRa1', 'wRh1'],
  ];
  const result = getCastlingTiles(timeline, 'wKe1');

  expect(result).toEqual([]);
});

test('Returns empty when both castling paths are blocked', () => {
  // Bishop at f1 blocks kingside; knight at b1 and bishop at c1 block queenside
  const timeline = [['wKe1', 'wRa1', 'wRh1', 'wBf1', 'wNb1', 'wBc1']];
  const result = getCastlingTiles(timeline, 'wKe1');

  expect(result).toEqual([]);
});

test('Returns only queenside when kingside rook has moved', () => {
  // Kingside rook moved away — not wRh1 in all snapshots
  const timeline = [
    ['wKe1', 'wRa1', 'wRh1'],
    ['wKe1', 'wRa1', 'wRg1'],
  ];
  const result = getCastlingTiles(timeline, 'wKe1');

  expect(result).toContain('c1');
  expect(result).not.toContain('g1');
});

// B5
test('Returns only kingside when queenside rook has moved', () => {
  // Queenside rook was at b1 — treated as having moved from a1
  const timeline = [
    ['wKe1', 'wRa1', 'wRh1'],
    ['wKe1', 'wRb1', 'wRh1'],
  ];
  const result = getCastlingTiles(timeline, 'wKe1');

  expect(result).not.toContain('c1');
  expect(result).toContain('g1');
});

// B6
test('Blocks kingside castling when king transit square f1 is attacked', () => {
  // bRf8 controls the entire f-file, including f1 which the king passes through
  const timeline = [['wKe1', 'wRa1', 'wRh1', 'bRf8', 'bKa8']];
  const result = getCastlingTiles(timeline, 'wKe1');

  expect(result).not.toContain('g1');
  expect(result).toContain('c1'); // queenside unaffected
});

test('Blocks queenside castling when king transit square d1 is attacked', () => {
  // bRd8 controls the d-file, including d1 which the king passes through
  const timeline = [['wKe1', 'wRa1', 'wRh1', 'bRd8', 'bKa8']];
  const result = getCastlingTiles(timeline, 'wKe1');

  expect(result).not.toContain('c1');
  expect(result).toContain('g1'); // kingside unaffected
});

// B8
test('Blocks kingside castling when landing square g1 is attacked', () => {
  // bRg8 controls the g-file, including g1 where the king would land
  const timeline = [['wKe1', 'wRa1', 'wRh1', 'bRg8', 'bKa8']];
  const result = getCastlingTiles(timeline, 'wKe1');

  expect(result).not.toContain('g1');
});

test('Blocks queenside castling when landing square c1 is attacked', () => {
  // bRc8 controls the c-file, including c1 where the king would land
  const timeline = [['wKe1', 'wRa1', 'wRh1', 'bRc8', 'bKa8']];
  const result = getCastlingTiles(timeline, 'wKe1');

  expect(result).not.toContain('c1');
});
