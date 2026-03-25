import { test, expect } from 'bun:test';
import { getTilesDifference } from '../get-tiles-difference';

test('Should be returned function', () => {
  expect(typeof getTilesDifference()).toBe('function');
  expect(typeof getTilesDifference(null)).toBe('function');
});

test('Should be returned tiles difference', () => {
  expect(getTilesDifference('a2', 'b5')).toEqual({
    file: 1,
    rank: 3,
  });
  expect(getTilesDifference('h2', 'a5')).toEqual({
    file: 7,
    rank: 3,
  });
});
