import { test, expect } from 'bun:test';
import removeDirection from '../removeDirection';

test('Should return function (curry)', () => {
  expect(typeof removeDirection()).toBe('function');
  expect(typeof removeDirection(null)).toBe('function');
  expect(typeof removeDirection(null, null)).toBe('function');
});

test('Should return movable tiles that removed direction code', () => {
  // TODO more test case
  expect(removeDirection('Vertical', ['e5', 'e6'], 'bPe7')).toEqual([]);
});
