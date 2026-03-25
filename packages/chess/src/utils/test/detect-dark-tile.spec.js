import { test, expect } from 'bun:test';
import { detectDarkTile } from '../detect-dark-tile';

test('Should throw Error', () => {
  expect(() => detectDarkTile('', 2)).toThrow(TypeError);
  expect(() => detectDarkTile('a', 0)).toThrow(TypeError);
});

test('Should return function (curry)', () => {
  expect(typeof detectDarkTile()).toBe('function');
  expect(typeof detectDarkTile('a')).toBe('function');
});

test('Should return boolean value', () => {
  expect(detectDarkTile('a', 2)).toBe(false);
  expect(detectDarkTile('a', 3)).toBe(true);
});
