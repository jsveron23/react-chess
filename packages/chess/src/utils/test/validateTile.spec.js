import { test, expect } from 'bun:test';
import validateTile from '../validateTile';

test('Should return function (curry)', () => {
  expect(typeof validateTile()).toBe('function');
  expect(typeof validateTile(null)).toBe('function');
});

test('Should return false', () => {
  expect(validateTile('j', 1)).toBe(false);
  expect(validateTile('a', 9)).toBe(false);
});

test('Should return validate result', () => {
  expect(validateTile('a', 1)).toBe(true);
});
