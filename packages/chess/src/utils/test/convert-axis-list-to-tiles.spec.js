import { test, expect } from 'bun:test';
import { convertAxisListToTiles } from '../convert-axis-list-to-tiles';

test('Should throw TypeError', () => {
  expect(() => convertAxisListToTiles('wa2', [[0, 0]])).toThrow(TypeError);
});

test('Should return function (curry)', () => {
  expect(typeof convertAxisListToTiles('')).toBe('function');
  expect(typeof convertAxisListToTiles('wPa2')).toBe('function');
});

test('Should return empty array when given axis is outside of diagram', () => {
  expect(convertAxisListToTiles('wPa7', [[1, 2]])).toEqual([]);
});

test('Should return tile list as array', () => {
  expect(convertAxisListToTiles('wPa2', [[1, 1]])).toEqual(['b3']);
  expect(
    convertAxisListToTiles('wPa2', [
      [1, 1],
      [1, 2],
      [1, 3],
    ])
  ).toEqual(['b3', 'b4', 'b5']);
  expect(
    convertAxisListToTiles('wKa7', [
      [1, 1],
      [1, 2],
      [1, 3],
    ])
  ).toEqual(['b8']);
  expect(convertAxisListToTiles('bPa7', [[1, 1]])).toEqual(['b6']);
});
