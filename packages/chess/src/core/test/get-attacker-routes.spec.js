import { test, expect } from 'bun:test';
import { getAttackerRoutes } from '../get-attacker-routes';

test('Returns only attacker tile when attacker is adjacent (contacted)', () => {
  // Black rook on e2, white king on e1 — one step apart
  const timeline = [['wKe1', 'bRe2']];
  const result = getAttackerRoutes(timeline, 'bRe2', 'wKe1');

  expect(result).toEqual(['e2']);
});

test('Returns path tiles and attacker tile for distant rook attack', () => {
  // Black rook on e8, white king on e1 — rook attacks along e-file
  const timeline = [['wKe1', 'bRe8']];
  const result = getAttackerRoutes(timeline, 'bRe8', 'wKe1');

  // All squares between king and rook are interposable
  expect(result).toContain('e2');
  expect(result).toContain('e4');
  expect(result).toContain('e7');
  // Attacker tile is always included
  expect(result).toContain('e8');
  // Tiles off the attack file should not be present
  expect(result).not.toContain('d5');
});

test('Returns path tiles and attacker tile for distant bishop attack', () => {
  // Black bishop on a6, white king on d3
  const timeline = [['wKd3', 'bBa6']];
  const result = getAttackerRoutes(timeline, 'bBa6', 'wKd3');

  // Squares along the diagonal between a6 and d3: b5, c4
  expect(result).toContain('b5');
  expect(result).toContain('c4');
  // Attacker tile included
  expect(result).toContain('a6');
  // Off-diagonal squares excluded
  expect(result).not.toContain('a1');
});
