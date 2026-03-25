import { test, expect } from 'bun:test';
import { subInBetweenIndexes } from '../sub-in-between-indexes';
import { File, Rank } from '../../presets';

test('Should return 0 when both values are the same', () => {
  expect(subInBetweenIndexes('a', 'a', File)).toBe(0);
  expect(subInBetweenIndexes(8, 8, Rank)).toBe(0);
});

test('Should return positive distance when a is after b', () => {
  expect(subInBetweenIndexes('e', 'a', File)).toBe(4);
  expect(subInBetweenIndexes('h', 'a', File)).toBe(7);
});

test('Should return negative distance when a is before b', () => {
  expect(subInBetweenIndexes('a', 'e', File)).toBe(-4);
  expect(subInBetweenIndexes('a', 'h', File)).toBe(-7);
});

test('Should return -1 when value is not found', () => {
  expect(subInBetweenIndexes('z', 'a', File)).toBe(-1);
});
