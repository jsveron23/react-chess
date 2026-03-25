import { test, expect } from 'bun:test';
import { getDodgeableTiles } from '../get-dodgeable-tiles';

test('King can move to safe squares not on the attacker route', () => {
  // bRe8 attacks wKe1 along the e-file; king can dodge to d1 or d2
  const timeline = [['wKe1', 'bRe8']];
  const routes = ['e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'];
  const result = getDodgeableTiles(timeline, 'bRe8', 'wKe1', routes);

  expect(result).toContain('d1');
  expect(result).toContain('d2');
  expect(result).not.toContain('e2'); // on attacker route
});

test('King cannot dodge to a square occupied by own piece', () => {
  // wRd1 blocks king from using d1 as an escape
  const timeline = [['wKe1', 'bRe8', 'wRd1']];
  const routes = ['e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'];
  const result = getDodgeableTiles(timeline, 'bRe8', 'wKe1', routes);

  expect(result).not.toContain('d1');
});

test('King cannot dodge to a square where attacker still covers', () => {
  // bQe8 attacks wKe1; queen also covers f2 diagonally
  const timeline = [['wKe1', 'bQe8']];
  const routes = ['e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'];
  const result = getDodgeableTiles(timeline, 'bQe8', 'wKe1', routes);

  expect(result).not.toContain('e2');
});
