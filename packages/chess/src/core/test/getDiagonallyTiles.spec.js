import { test, expect } from 'bun:test';
import getDiagonallyTiles from '../getDiagonallyTiles';

// prettier-ignore
const snapshot = [
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
    'bPa7', 'bPb7', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc4', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
    'wRa1', 'wNb1', 'wBc1', 'wQa4', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
  ]

test('Should be returned function', () => {
  expect(typeof getDiagonallyTiles()).toBe('function');
  expect(typeof getDiagonallyTiles(null)).toBe('function');
});

test('Should be returned empty value', () => {
  expect(getDiagonallyTiles('wPa2', snapshot)).toEqual([]);
  expect(getDiagonallyTiles('bPh7', snapshot)).toEqual([]);
});

test('Should be returned diagonally forward tiles', () => {
  expect(getDiagonallyTiles('wPc4', snapshot)).toEqual(['d5']);
  expect(getDiagonallyTiles('bPd5', snapshot)).toEqual(['c4']);
});
