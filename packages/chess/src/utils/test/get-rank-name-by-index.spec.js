import { test, expect } from 'bun:test';
import { getNextRankByIndex } from '../get-next-rank-by-index';

test('Should return function (curry)', () => {
  expect(typeof getNextRankByIndex()).toBe('function');
  expect(typeof getNextRankByIndex(null)).toBe('function');
});

test('Should return next rank of given index', () => {
  expect(getNextRankByIndex('2', 1)).toEqual(3);
});
