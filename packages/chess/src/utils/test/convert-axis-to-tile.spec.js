import { test, expect } from 'bun:test';
import { convertAxisToTile } from '../convert-axis-to-tile';

test('Should return function (curry)', () => {
  expect(typeof convertAxisToTile('')).toBe('function');
  expect(typeof convertAxisToTile('wPa2')).toBe('function');
});

test('Should return empty string when given code is not valid', () => {
  expect(convertAxisToTile('wa7', [1, 2])).toBe('');
});

test('Should return empty string when given axis is outside of diagram', () => {
  expect(convertAxisToTile('wPa7', [1, 2])).toBe('');
});

test('Should return tile as string', () => {
  expect(convertAxisToTile('wPa2', [1, 1])).toBe('b3');
  expect(convertAxisToTile('bPa7', [1, 1])).toBe('b6');
});
