import { test, expect } from 'bun:test';
import { computeSpecialMT } from '../compute-special-mt';

test('Pawn at starting rank returns double-step tile', () => {
  const timeline = [['wKe1', 'wPe2']];
  const result = computeSpecialMT(timeline, 'wPe2');

  expect(result).toContain('e4');
});

test('Pawn not at starting rank has no double step', () => {
  const timeline = [['wKe1', 'wPe3']];
  const result = computeSpecialMT(timeline, 'wPe3');

  expect(result).not.toContain('e5');
});

test('Double step unavailable when square ahead is occupied', () => {
  const timeline = [['wKe1', 'wPe2', 'bPe3']];
  const result = computeSpecialMT(timeline, 'wPe2');

  expect(result).not.toContain('e4');
});

test('Diagonal capture tile returned when enemy is diagonally ahead', () => {
  const timeline = [['wKe1', 'wPe4', 'bPd5']];
  const result = computeSpecialMT(timeline, 'wPe4');

  expect(result).toContain('d5');
});

test('No diagonal capture tile when no enemy is diagonally ahead', () => {
  const timeline = [['wKe1', 'wPe4']];
  const result = computeSpecialMT(timeline, 'wPe4');

  expect(result).not.toContain('d5');
  expect(result).not.toContain('f5');
});

test('En passant tile returned after opponent pawn double-step', () => {
  // Black pawn moved from d7 to d5 last turn; white pawn is at e5
  const current = ['wKe1', 'wPe5', 'bPd5'];
  const previous = ['wKe1', 'wPe5', 'bPd7'];
  const timeline = [current, previous];
  const result = computeSpecialMT(timeline, 'wPe5');

  expect(result).toContain('d6');
});

test('Non-pawn piece returns empty special moves', () => {
  const timeline = [['wKe1', 'wRa1']];

  expect(computeSpecialMT(timeline, 'wRa1')).toEqual([]);
  expect(computeSpecialMT(timeline, 'wKe1')).toEqual([]);
});
