import { test, expect } from 'bun:test';
import { getDefenders } from '../get-defenders';

test('Returns empty when no piece can defend', () => {
  const timeline = [['wKe1', 'bRe8']];
  const routes = ['e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'];
  const result = getDefenders('bRe8', timeline, routes);

  expect(result.of).toEqual([]);
  expect(result.tiles).toEqual([]);
});

test('King is excluded from defenders', () => {
  const timeline = [['wKe1', 'bRe8']];
  const routes = ['e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'];
  const result = getDefenders('bRe8', timeline, routes);

  expect(result.of).not.toContain('wKe1');
});

test('Returns correct defender that can block along the route', () => {
  // wRa5 can move to e5 to block bRe8 attacking wKe1
  const timeline = [['wKe1', 'bRe8', 'wRa5']];
  const routes = ['e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'];
  const result = getDefenders('bRe8', timeline, routes);

  expect(result.of).toContain('wRa5');
  expect(result.tiles).toContain('e5');
});

test('result.self contains code and defendableTiles for each defender', () => {
  const timeline = [['wKe1', 'bRe8', 'wRa5']];
  const routes = ['e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'];
  const result = getDefenders('bRe8', timeline, routes);

  expect(result.self).toHaveLength(1);
  expect(result.self[0].code).toBe('wRa5');
  expect(result.self[0].defendableTiles).toContain('e5');
});
