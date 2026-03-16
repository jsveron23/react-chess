import { test, expect } from 'bun:test';
import getNextFileByIndex from '../getNextFileByIndex';

test('Should return function (curry)', () => {
  expect(typeof getNextFileByIndex()).toBe('function');
  expect(typeof getNextFileByIndex(null)).toBe('function');
});

test('Should return next file of given index', () => {
  expect(getNextFileByIndex('a', 1)).toEqual('b');
});
